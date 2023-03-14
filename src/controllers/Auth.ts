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
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({
                resultCode: 1,
                errors:
                    {
                        success: false,
                        error: {
                            issues: [
                                {
                                    "message": `Нет токена`
                                }
                            ],
                            name: "serverError"
                        }
                    },
                data: {}
            });
    }

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const user: User = await req.app.locals.users.findOne({...queryParams})

    if (!user) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({
            resultCode: 1,
            errors:
                {
                    success: false,
                    error: {
                        issues: [
                            {
                                "message": `Не авторизован`
                            }
                        ],
                        name: "serverError"
                    }
                },
            data: {}
        });
    }

    next();
}
