import {FindCursor} from "mongodb";
import {User} from "../types";
import {Request} from "express";
import {defaultCount, defaultPage, maxCount} from "../const";

interface Props<T, D> {
    projection: T;
    queryParams: D;
    page?: number;
    count?: number;
    req: Request
}

interface Values {
    items:  User[][];
    length: number;
    totalPages: number
}

export const getItemsWithLengthAndTotalPages = async <T, D>({
        projection,
        queryParams,
        page = defaultPage,
        count = defaultCount,
        req
    }: Props<T, D>): Promise<Values> => {
    let validConst = count;

    if (count > maxCount) {
        validConst = maxCount;
    }

    const findCursor: FindCursor<Array<User>> = await req.app.locals.users.find({...queryParams}, {projection: projection});

    const items = await findCursor.skip(page * validConst - validConst).limit(validConst).toArray();

    const length = await req.app.locals.users.countDocuments({...queryParams}, projection);

    const totalPages = Math.ceil(length / validConst);

    return {items, length, totalPages};
}
