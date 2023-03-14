import { Request, Response } from 'express';
import {isValidUserId} from "../helpers/isValidUserId";
import {ServerResponse, User} from "../types";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../helpers/statuses";
import {generateServerErrors} from "../helpers/generateServerErrors";

type FindedParams = {
    _id: ObjectId
}

export const GetFollow = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const token = req.headers.authorization;

    if (!token) {
        return null;
    }

    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
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

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {isFollowed},
    }

    res.json(response);
}
