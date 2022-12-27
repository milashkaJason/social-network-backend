import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    User,
} from "../types";
import {ProjectionGetAuthMe} from "../helpers/projections";

type FindedParams = {
    token: string
}

export const GetAuthMe = async (req: Request, res: Response) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({error: {message: `Нет токена`}});
    }

    const projection: ProjectionGetAuthMe = {
        email: true,
        login: true,
    }

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const user: User = await req.app.locals.users.findOne({...queryParams}, {projection: projection})

    if (!user) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({error: {message: `Не авторизован`}});
    }

    res.json({data: user, resultCode: 0, messages: [],});
}
