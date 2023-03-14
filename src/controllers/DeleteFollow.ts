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


    if (!isFollowed) {
        return res.status(HTTP_STATUSES.BAD_REQUEST_400).json({
            resultCode: 1,
            errors:
                {
                    success: false,
                    error: {
                        issues: [
                            {
                                "message": `Пользователь не является подписчиком`
                            }
                        ],
                        name: "serverError"
                    }
                },
            data: {}
        });
    }

    req.app.locals.users.updateOne({ token: token.split(' ')[1] }, {$pull: {memberships: new ObjectId(userId)
    }});

    res.json({
        resultCode: 0,
        errors: null,
        data: {}
    });
}
