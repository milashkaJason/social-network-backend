import {db} from "../DB";
import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../statuses";

export const GetUsersById = (req: Request, res: Response) => {
    const findUser = db.users.find((user) => {
        return user._id === req.params.id;
    })
    if (findUser) {
        res.json(findUser);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
}