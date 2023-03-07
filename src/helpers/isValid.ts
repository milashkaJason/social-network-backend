import {Response} from "express";
import {HTTP_STATUSES} from "./statuses";

export const isValid = async <T>(obj: T, res: Response, zodObj: any) => {
    const parsedObj = zodObj.safeParse(obj);

    if (parsedObj.success) {
        return true;
    }

    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(
        {
            resultCode: 1,
            messages: parsedObj.error.message,
            data: {}
        }
        );

    return false
}
