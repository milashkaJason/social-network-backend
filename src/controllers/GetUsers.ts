import {GetUsersReqQueryType, User, ZGetUsersReqQuery} from "../types";
import {Request, Response} from 'express';
import {isValid} from "../helpers/isValid";
import {getItemsWithLengthAndTotalPages} from "../helpers/getItemsWithLengthAndTotalPages";
import {ProjectionGetUsers} from "../helpers/projections";
import {ObjectId} from "mongodb";

type FindedParams = {
    name?: {
        '$regex': string
    }
    followed?: boolean
}

export const GetUsers = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    let memberships: Array<ObjectId> = []

    if (token) {
        let isAuthorized: boolean;
        const currentUser: User = await req.app.locals.users.findOne({ token: token.split(' ')[1]});
        isAuthorized = !!currentUser;

        if (isAuthorized) {
            memberships = currentUser.memberships;
        }
    }

    const { term, friend, count, page }:GetUsersReqQueryType = req.query as GetUsersReqQueryType;

    const isValidArgs = await isValid<GetUsersReqQueryType>({term, friend, count, page}, res, ZGetUsersReqQuery);

    if (!isValidArgs) return;

    let queryParams: FindedParams = {};

    if (term) {
        queryParams.name = { '$regex': term };
    }

    if (friend !== undefined) {
        queryParams.followed = friend;
    }

    const projection: ProjectionGetUsers = {photos: true, name: true, followed: true, status: true};

    const {items, length, totalPages} = await getItemsWithLengthAndTotalPages<ProjectionGetUsers, FindedParams>(
        {projection, queryParams, page, count, req});

    const newUsers = []

    for (let i = 0; i < items.length; i++) {
        // @ts-ignore
        const user: User = items[i]

        const isFollowed = !!memberships.find((itemId) => {
            return itemId.toString() === user._id.toString()
        });

        if (isFollowed) {
            newUsers.push({ ...user, followed: true })
        } else {
            newUsers.push(user)
        }
    }

    const data = {items: newUsers, totalCount: length, error: null, totalPages: totalPages}
    res.json({
        resultCode: 0,
        errors: null,
        data: data,
    });
}
