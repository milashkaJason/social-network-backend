import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    User,
} from "../types";
import {ProjectionGetAuthMe} from "../helpers/projections";
import {isValidUserId} from "../helpers/isValidUserId";
import {ObjectId} from "mongodb";

type FindedParams = {
    _id: ObjectId
}

export const GetAuthMe = async (req: Request, res: Response) => {
    const userId = '63a475ea8070f55d73bdb933';

    isValidUserId(userId, res);

    const projection: ProjectionGetAuthMe = {
        email: true,
        login: true,
    }

    const queryParams: FindedParams = {
        _id: new ObjectId(userId)
    }

    const user: User = await req.app.locals.users.findOne({...queryParams}, {projection: projection})

    if (!user) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({error: {message: `Пользователь не найден`}});
        return;
    }

    res.json({data: user, resultCode: 0, messages: [],});
}
