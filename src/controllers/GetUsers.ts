import {defaultCount, defaultPage} from "../getPaginatedItems";
import {GetUsersReqQuery, User} from "../types";
import {Request, Response} from 'express';
import {HTTP_STATUSES} from "../statuses";

type FindedParams = {
    name?: {
        '$regex': string
    }
    followed?: boolean
}

export const GetUsers = async (req: Request, res: Response) => {

    let { term, friend, count = defaultCount, page = defaultPage }:GetUsersReqQuery = req.query as GetUsersReqQuery;

    if (!Number.isInteger(count)) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: {message: `count - не является числом`}});
        return;
    }

    if (typeof friend !== "boolean" && friend !== undefined) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({error: {message: `friend - не является булевым значением`}});
        return;
    }

    let queryParams: FindedParams = {};

    if (term) {
        queryParams.name = { '$regex': term };
    }

    if (friend !== undefined) {
        queryParams.followed = friend;
    }

    let users: Array<User> = await req.app.locals.users.find({...queryParams},
        {photos: true, name: true, followed: true, status: true}
        ).skip(page * count - count).limit(count).toArray();

    const userLength = await req.app.locals.users.count();

    const data = {items: users, totalCount: userLength, error: null, totalPages: Math.ceil(userLength / count)}
    res.json(data);
}
