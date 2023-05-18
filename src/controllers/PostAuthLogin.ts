import {Request, Response} from "express";
import {PostAuthMeReqBodyType, ServerResponse, User, ZPostAuthMeReqBody} from "../types";
import {isValid} from "../helpers/isValid";
import {hashPassword} from "../helpers/password";
import {HTTP_STATUSES} from "../helpers/statuses";
import jwt from "jsonwebtoken";
import {ProjectionPostAuthMe} from "../helpers/projections";
import {generateServerErrors} from "../helpers/generateServerErrors";

export const PostAuthLogin = async (req: Request, res: Response) => {
    const { rememberMe, login, password, recaptchaToken } = req.body as PostAuthMeReqBodyType;

    const isValidArgs = await isValid<PostAuthMeReqBodyType>({rememberMe, login, password, recaptchaToken}, res, ZPostAuthMeReqBody);


    if (!isValidArgs) return;

    const user: User = await req.app.locals.users.findOne({login: login});

    const hashedPassword = hashPassword(password);


    if (!user) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Пользователь с данным логином не существует`]),
            data: {}
        }

        res.status(HTTP_STATUSES.NOT_FOUND_404).send(response);
        return;
    }

    const projection: ProjectionPostAuthMe = {
        token: true,
    }

    if (user && user.password === hashedPassword) {
        const token = jwt.sign({
            data: user.login
        }, 'secret');

        await req.app.locals.users.updateOne({login : login}, {$set: {token : token}});
        const newUser: User = await req.app.locals.users.findOne({login: login}, {projection: projection});

        const response: ServerResponse = {
            resultCode: 0,
            errors: null,
            data: {
                userId: newUser._id,
                token: newUser.token
            }
        }

        res.status(HTTP_STATUSES.OK_200).json(response)
    } else {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Неправильный пароль`]),
            data: {}
        }

        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).send(response);
    }
}