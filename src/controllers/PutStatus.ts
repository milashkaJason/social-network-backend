import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {PutStatusReqBodyType, ZPutStatusReqBody} from "../types";
import {isValid} from "../helpers/isValid";

type FindedParams = {
    token: string
}

export const PutStatus = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
        return null;
    }

    const { status } = req.body as PutStatusReqBodyType;

    const isValidArgs = await isValid<PutStatusReqBodyType>({status}, res, ZPutStatusReqBody);

    if (!isValidArgs) return;

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    await req.app.locals.users.updateOne({...queryParams}, {$set: {status : status}});

    res.status(HTTP_STATUSES.OK_200).json({
        resultCode: 0,
        messages: [],
        data: {}
    })
}
