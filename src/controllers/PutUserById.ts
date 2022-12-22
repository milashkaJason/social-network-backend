import {db} from "../DB";
import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../statuses";

export const PutUserById = (req: Request, res: Response) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const findUser = db.users.find((user) => {
        return user._id === req.params.id;
    })
    if (!findUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    findUser.name = req.body.name
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}