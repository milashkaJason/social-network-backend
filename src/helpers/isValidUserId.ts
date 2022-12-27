import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "./statuses";
import {errorWithTypeId} from "./errorWithTypeId";
import {Response} from "express";

export const isValidUserId = (userId: string, res: Response) => {
    if (ObjectId.isValid(userId)) {
        return true;
    }
    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(errorWithTypeId('userId'))
    return false;
}
