import { Request, Response } from 'express';
import {isValidUserId} from "../helpers/isValidUserId";
import {HTTP_STATUSES} from "../helpers/statuses";
import {User} from "../types";
import {ObjectId} from "mongodb";

type FindedParams = {
    _id: ObjectId
}

export const DeleteFollow = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
    }

    const token = req.headers.authorization

    if (!token) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({error: {message: `Нет токена`}});
    }

    const user: User = await req.app.locals.users.findOne({ token: token.split(' ')[1] }, { projection: {memberships: true} });

    if (!user) {
        return res.status(HTTP_STATUSES.NE_CREDENTIALS_403).json({error: {message: `Не авторизован`}});
    }

    const queryParams: FindedParams = {
        _id: new ObjectId(userId)
    }

    const presumablyFollowedUser: User =
        await req.app.locals.users.findOne({...queryParams});

    if (!presumablyFollowedUser) {
        return res.status(HTTP_STATUSES.NOT_FOUND_404).json({error: {message: `Пользователя не существует`}});
    }

    const isFollowed = !!user.memberships.find((id) => {
        return id.toString() === userId;
    })


    if (!isFollowed) {
        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json({error: {message: `Пользователь не является подписчиком`}});
    }

    req.app.locals.users.updateOne({ token: token.split(' ')[1] }, {$pull: {memberships: new ObjectId(userId)
    }});

    res.json({
        resultCode: 0,
        messages: [],
        data: {}
    });
}
