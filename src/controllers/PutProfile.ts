import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    PutProfileReqBodyType,
    ServerResponse,
    ZPutProfileReqBodyType,
} from "../types";
import {isValid} from "../helpers/isValid";

type FindedParams = {
    token: string
}

export const PutProfile = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
        return null;
    }

    const body = req.body as PutProfileReqBodyType;

    const isValidArgs = await isValid<PutProfileReqBodyType>(body, res, ZPutProfileReqBodyType);

    if (!isValidArgs) return;

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    await req.app.locals.users.updateOne({...queryParams}, {$set: body});

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {}
    }

    res.status(HTTP_STATUSES.OK_200).json(response)
}
