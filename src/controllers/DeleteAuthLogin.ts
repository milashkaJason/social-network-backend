import { Request, Response} from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";

type FindedParams = {
    token: string
}

export const DeleteAuthLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (token) {
        const queryParams: FindedParams = {
            token: token.split(' ')[1]
        }

        await req.app.locals.users.updateOne({ ...queryParams }, {$set: {token: null}});
    }

    res.status(HTTP_STATUSES.OK_200).json({
        resultCode: 0,
        errors: null,
        data: {}
    })
}
