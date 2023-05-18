import {NextFunction, Request, Response} from 'express';
import {HTTP_STATUSES} from "../helpers/statuses";
import {
    PostAuthMeReqBodyType, ServerResponse,
} from "../types";
import * as dotenv from "dotenv";
import {generateServerErrors} from "../helpers/generateServerErrors";

dotenv.config();
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
const recaptchaEnabled = process.env.RECAPTCHA_ENABLED;

const googleApiUrl = 'https://www.google.com/recaptcha/api/siteverify';

export const CheckCaptcha = async (req: Request, res: Response, next: NextFunction) => {
    if (!recaptchaEnabled) {
        next();
        return;
    }

    const { recaptchaToken } = req.body as PostAuthMeReqBodyType;

    if (!recaptchaToken || recaptchaToken === '') {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            resultCode: 1,
            errors: generateServerErrors(['Введите каптчу']),
            data: {}
        });

        return;
    }

    const response = await fetch(googleApiUrl, {
        method: 'POST',
        body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    //@ts-ignore
    const googleResponse = await response.text();
    const googleResponseObj = JSON.parse(googleResponse);

    if (!googleResponseObj.success) {
        const data: ServerResponse = {
            resultCode: 1,
            errors: generateServerErrors(googleResponseObj['error-codes']),
            data: {}
        }

        return  res.status(HTTP_STATUSES.BAD_REQUEST_400).send(data);
    }

    next();
}
