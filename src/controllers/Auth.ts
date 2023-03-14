import {NextFunction, Request, Response} from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    User,
} from "../types";

type FindedParams = {
    token: string
}

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({error: {message: `Нет токена`}});
    }

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const user: User = await req.app.locals.users.findOne({...queryParams})

    if (!user) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({
            resultCode: 1,
            messages: ['Не авторизован'],
            data: {}
        });
    }

    next();
}
