import { Request, Response } from 'express';
import {
    User,
} from "../types";
import {ProjectionGetAuthMe} from "../helpers/projections";

type FindedParams = {
    token: string
}

export const GetAuthMe = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
        return null;
    }

    const projection: ProjectionGetAuthMe = {
        email: true,
        login: true,
    }

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const user: User = await req.app.locals.users.findOne({...queryParams}, {projection: projection})

    res.json({
        resultCode: 0,
        errors: null,
        data: user,
    });
}
