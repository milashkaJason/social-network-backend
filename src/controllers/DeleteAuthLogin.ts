import { Request, Response} from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {ServerResponse} from "../types";

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

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {}
    }

    res.status(HTTP_STATUSES.OK_200).json(response)
}
