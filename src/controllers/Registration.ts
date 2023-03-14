import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    RegistrationReqBodyType, ServerResponse,
    User,
    ZRegistrationReqBody,
} from "../types";
import mongoose from "mongoose";
import {userScheme} from "../models/userSchema";
import {isValid} from "../helpers/isValid";
import {hashPassword} from "../helpers/password";
import {ProjectionRegistration} from "../helpers/projections";
import {generateServerErrors} from "../helpers/generateServerErrors";

export const Registration = async (req: Request, res: Response) => {

    const { name, login, password } = req.body as RegistrationReqBodyType;

    const isValidArgs = await isValid<RegistrationReqBodyType>({name, login, password}, res, ZRegistrationReqBody);

    if (!isValidArgs) return;

    const hasEqual: boolean = !!await req.app.locals.users.findOne({login: login});

    if (hasEqual) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Пользователь с данным логином уже существует`]),
            data: {}
        }

        res.status(HTTP_STATUSES.BAD_REQUEST_400).send(response);
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

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: createdUser,
    }

    res.status(HTTP_STATUSES.CREATED_201).json(response)
}
