import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "./statuses";
import {errorWithTypeId} from "./errorWithTypeId";
import {Response} from "express";
import {ServerResponse} from "../types";

export const isValidUserId = (userId: string, res: Response) => {
    if (ObjectId.isValid(userId)) {
        return true;
    }

    const response: ServerResponse = errorWithTypeId('userId')

    res.status(HTTP_STATUSES.BAD_REQUEST_400).send(response)

    return false;
}
