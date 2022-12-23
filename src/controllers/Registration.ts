import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    RegistrationReqBodyType,
    User,
    ZRegistrationReqBody,
} from "../types";
import mongoose from "mongoose";
import {userScheme} from "../models/userSchema";
import {isValid} from "../helpers/isValid";
import {hashPassword} from "../helpers/password";
import {ProjectionRegistration} from "../helpers/projections";

export const Registration = async (req: Request, res: Response) => {

    const { name, login, password } = req.body as RegistrationReqBodyType;

    const isValidArgs = await isValid<RegistrationReqBodyType>({name, login, password}, res, ZRegistrationReqBody);

    if (!isValidArgs) return;

    const hasEqual: boolean = !!await req.app.locals.users.findOne({login: login});

    if (hasEqual) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: {message: `Пользователь с данным логином уже существует`}});
        return;
    }

    const passwordToSave = hashPassword(password)

    const User = mongoose.model("User", userScheme);
    const user = new User({
        name: req.body.name,
        login: req.body.login,
        password: passwordToSave,
    })

    req.app.locals.users.insertOne(user);

    const projection: ProjectionRegistration = {name: true, login: true}

    const createdUser: User = await req.app.locals.users.findOne({login: req.body.login}, {projection: projection});

    res.status(HTTP_STATUSES.CREATED_201).json(createdUser)
}
