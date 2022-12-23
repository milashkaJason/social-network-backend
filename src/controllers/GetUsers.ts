import { GetUsersReqQueryType, ZGetUsersReqQuery} from "../types";
import {Request, Response} from 'express';
import {isValid} from "../helpers/isValid";
import {getItemsWithLengthAndTotalPages} from "../helpers/getItemsWithLengthAndTotalPages";
import {ProjectionGetUsers} from "../helpers/projections";

type FindedParams = {
    name?: {
        '$regex': string
    }
    followed?: boolean
}

export const GetUsers = async (req: Request, res: Response) => {
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

    const data = {items: items, totalCount: length, error: null, totalPages: totalPages}
    res.json(data);
}
