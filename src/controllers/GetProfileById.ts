import {User} from "../types";
import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {HTTP_STATUSES} from "../helpers/statuses";
import {isValidUserId} from "../helpers/isValidUserId";
import {ProjectionGetProfile} from "../helpers/projections";

type FindedParams = {
    _id: ObjectId
}

export const GetProfileById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
    }

    const projection: ProjectionGetProfile = {
        photos: true,
        lookingForAJob: true,
        lookingForAJobDescription: true,
        fullName: true, contacts: true,
    }

    const queryParams: FindedParams = {
        _id: new ObjectId(userId)
    }

    const user: User = await req.app.locals.users.findOne({...queryParams}, {projection: projection})

    if (!user) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({
            resultCode: 1,
            errors:
                {
                    success: false,
                    error: {
                        issues: [
                            {
                                "message": `Пользователь не найден`
                            }
                        ],
                        name: "serverError"
                    }
                },
            data: {}
        });
        return;
    }

    res.json({
        resultCode: 0,
        errors: null,
        data: user,
    });
}
