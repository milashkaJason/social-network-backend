import {ServerResponse, User} from "../types";
import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../helpers/statuses";
import {isValidUserId} from "../helpers/isValidUserId";
import {ProjectionGetStatusById} from "../helpers/projections";
import {generateServerErrors} from "../helpers/generateServerErrors";

type FindedParams = {
    _id: ObjectId
}

export const GetStatusById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
    }

    const projection: ProjectionGetStatusById = {
        status: true,
    }

    const queryParams: FindedParams = {
        _id: new ObjectId(userId)
    }

    const user: User = await req.app.locals.users.findOne({...queryParams}, {projection: projection})

    if (!user) {
        const response: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors([`Пользователь не найден`]),
            data: {}
        }

        res.status(HTTP_STATUSES.NOT_FOUND_404).send(response);
        return;
    }

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {status: user.status},
    }

    res.json(response);
}
