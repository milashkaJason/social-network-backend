import { Request, Response } from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import fs from "fs";
import path from "path";

const folderForUploads = process.env.FOLDER_FOR_UPLOAD;
const newDirName = path.resolve(__dirname, '../..');

export const GetUploads = async (req: Request, res: Response) => {
    const photoName = req.params.photoName;

    fs.readFile(newDirName + folderForUploads + photoName, "utf8",
        function(error){
            if (error) {
                return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            }

            res.sendFile(newDirName + folderForUploads + photoName );
        });
}
