import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    ServerResponse,
} from "../types";
import * as dotenv from "dotenv";
import path from "path";

type FindedParams = {
    token: string
}

dotenv.config();
const port = process.env.MAIN_PORT;
const hostName = process.env.HOST_NAME;
const folderForUploads = process.env.FOLDER_FOR_UPLOAD;
const newDirName = path.resolve(__dirname, '../..');

export const PutPhoto = async (req: Request, res: Response) => {

    const token = req.headers.authorization;

    if (!token) {
        return null;
    }

    //@ts-ignore
    const { image } = req.files;

    if (!image) return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);

    if (!/^image/.test(image.mimetype)) return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);

    const imgUrl = newDirName + folderForUploads + image.name;
    const imgUrlForUser = `${hostName}:${port}` + folderForUploads + image.name;

    image.mv(imgUrl);

    const queryParams: FindedParams = {
        token: token.split(' ')[1]
    }

    const photos = {
        small: imgUrlForUser,
        large: imgUrlForUser,
    }

    await req.app.locals.users.updateOne({...queryParams}, {$set: {photos: photos}});

    const response: ServerResponse = {
        resultCode: 0,
        errors: null,
        data: {
            small: imgUrlForUser,
            large: imgUrlForUser,
        }
    }

    res.status(HTTP_STATUSES.OK_200).json(response)
}
