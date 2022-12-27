import { Request, Response } from 'express';
import {isValidUserId} from "../helpers/isValidUserId";

export const DeleteFollow = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const isValidArgs = await isValidUserId(userId, res);

    if (!isValidArgs) {
        return
    }

    res.json({
        resultCode: 0,
        messages: [],
        data: {}
    });
}
