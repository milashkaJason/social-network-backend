import {Response} from "express";
import {HTTP_STATUSES} from "./statuses";
import {ServerResponse} from "../types";

export const isValid = async <T>(obj: T, res: Response, zodObj: any) => {
    const parsedObj = zodObj.safeParse(obj);

    if (parsedObj.success) {
        return true;
    }

    const response: ServerResponse = {
        resultCode: 1,
        errors: parsedObj,
        data: {}
    }

    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(response);

    return false
}
