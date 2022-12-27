import {Request, Response} from "express";
import {PostAuthMeReqBodyType, User, ZPostAuthMeReqBody} from "../types";
import {isValid} from "../helpers/isValid";
import {hashPassword} from "../helpers/password";
import {HTTP_STATUSES} from "../helpers/statuses";
import jwt from "jsonwebtoken";
import {ProjectionPostAuthMe} from "../helpers/projections";

export const PostAuthLogin = async (req: Request, res: Response) => {
    const { rememberMe, login, password } = req.body as PostAuthMeReqBodyType;

    const isValidArgs = await isValid<PostAuthMeReqBodyType>({rememberMe, login, password}, res, ZPostAuthMeReqBody);


    if (!isValidArgs) return;

    const user: User = await req.app.locals.users.findOne({login: login});

    const hashedPassword = hashPassword(password);


    if (!user) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: {message: `Пользователь с данным логином не существует`}});
        return;
    }

    const projection: ProjectionPostAuthMe = {
        token: true,
    }

    if (user && user.password === hashedPassword) {
        const token = jwt.sign({
            data: user
        }, 'secret');

        req.app.locals.users.updateOne({login : login}, {$set: {token : token}});
        const newUser: User = await req.app.locals.users.findOne({login: login}, {projection: projection});

        res.status(HTTP_STATUSES.OK_200).json({
            resultCode: 0,
            messages: [],
            data: {
                userId: newUser._id,
                token: newUser.token
            }
        })
    } else {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).send({error: {message: `Неправильный пароль`}});
    }
}