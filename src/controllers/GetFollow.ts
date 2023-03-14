import { Request, Response } from 'express';
import {isValidUserId} from "../helpers/isValidUserId";
import {User} from "../types";
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../helpers/statuses";

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
        return res.status(HTTP_STATUSES.NOT_FOUND_404).json({
            resultCode: 1,
            errors:
                {
                    success: false,
                    error: {
                        issues: [
                            {
                                "message": `Пользователя не существует`
                            }
                        ],
                        name: "serverError"
                    }
                },
            data: {}
        });
    }

    const isFollowed = !!user.memberships.find((id) => {
        return id.toString() === userId;
    })

    res.json({
        resultCode: 0,
        errors: null,
        data: {isFollowed},
    });
}
