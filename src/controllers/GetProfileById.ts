import { User} from "../types";
import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../statuses";

export const GetProfileById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: {message: `Не валидный ID пользователя`}});
        return;
    }

    let user: User = await req.app.locals.users.findOne({_id: new ObjectId(userId)},
        {photos: true, lookingForAJob: true, lookingForAJobDescription: true, fullName: true, contacts: true})

    if (!user) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: {message: `Пользователь не найден`}});
        return;
    }

    res.json(user);
}
