import {db} from "../DB";
import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../statuses";

export const DeleteUsersById = (req: Request, res: Response) => {
    db.users = db.users.filter((user) => {
        return user._id !== req.params.id;
    })

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}