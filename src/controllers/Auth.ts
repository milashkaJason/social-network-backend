import {NextFunction, Request, Response} from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    ServerResponse,
    User,
} from "../types";
import {generateServerErrors} from "../helpers/generateServerErrors";

type FindedParams = {
    token: string
}

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Нет токена`]),
            data: {}
        }

        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json(response);
    }

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const user: User = await req.app.locals.users.findOne({...queryParams})

    if (!user) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Не авторизован`]),
            data: {}
        }

        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json(response);
    }

    next();
}
