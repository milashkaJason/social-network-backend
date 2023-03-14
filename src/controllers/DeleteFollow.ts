import { Request, Response } from 'express';
import {isValidUserId} from "../helpers/isValidUserId";
import {HTTP_STATUSES} from "../helpers/statuses";
import {ServerResponse, User} from "../types";
import {ObjectId} from "mongodb";
import {generateServerErrors} from "../helpers/generateServerErrors";

type FindedParams = {
    _id: ObjectId
}

export const DeleteFollow = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const token = req.headers.authorization
    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
    }

    if (!token) {
        return null;
    }

    const user: User = await req.app.locals.users.findOne({ token: token.split(' ')[1] }, { projection: {memberships: true} });

    const queryParams: FindedParams = {
        _id: new ObjectId(userId)
    }

    const presumablyFollowedUser: User =
        await req.app.locals.users.findOne({...queryParams});

    if (!presumablyFollowedUser) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Пользователя не существует`]),
            data: {}
        }

        return res.status(HTTP_STATUSES.NOT_FOUND_404).json(response);
    }

    const isFollowed = !!user.memberships.find((id) => {
        return id.toString() === userId;
    })


    if (!isFollowed) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Пользователь не является подписчиком`]),
            data: {}
        }

        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json(response);
    }

    req.app.locals.users.updateOne({ token: token.split(' ')[1] }, {$pull: {memberships: new ObjectId(userId)
    }});

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {}
    }

    res.json(response);
}
