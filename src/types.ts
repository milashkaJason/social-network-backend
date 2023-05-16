import { z } from 'zod';
import {ObjectId} from "mongodb";

export type ServerResponse = {
    resultCode: number,
    errors: ServerErrors | ZodErrors | null,
    data: Object,
}

export type ServerErrors = {
    success: false,
    error: {
        issues: Array<{ message: string }>,
        name: "serverError"
    }
}

type ZodErrorObj = {
    code: string,
    expected: string,
    received: string,
    path: Array<string>,
    message: string
}

export type ZodErrors = {
    success: false,
    error: {
        issues: Array<ZodErrorObj>,
        name: "ZodError"
    }
}

export type User = {
    _id: ObjectId,
    name: string,
    login: string,
    password: string,
    token: string,
    photos: {
        small: string | null,
        large: string | null
    },
    memberships: [ObjectId]
    status?: string | null,
    followed: boolean,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string,
    }
}

export interface GetUsersReqQueryType {
    term?: string;
    friend?: boolean;
    count?: number;
    page?: number;
}

export const ZGetUsersReqQuery = z.object({
    term: z.string().optional(),
    friend: z.boolean().optional(),
    count: z.number().optional(),
    page: z.number().optional(),
});

export const ZRegistrationReqBody = z.object({
    name: z.string(),
    password: z.string(),
    login: z.string(),
});

export interface RegistrationReqBodyType {
    name: string,
    password: string,
    login: string,
}

export interface PostAuthMeReqBodyType {
    rememberMe?: boolean,
    password: string,
    login: string,
}

export const ZPostAuthMeReqBody = z.object({
    rememberMe: z.boolean().optional(),
    password: z.string(),
    login: z.string(),
});

export interface PutStatusReqBodyType {
    status: string,
}

export const ZPutStatusReqBody = z.object({
    status: z.string().max(300).min(1),
});

export interface PutProfileReqBodyType {
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string,
    }
}

export const ZPutProfileReqBodyType = z.object({
    lookingForAJob: z.boolean(),
    lookingForAJobDescription:  z.string().max(300).min(1),
    fullName:  z.string().max(300).min(1),
    contacts: z.object({
        github:  z.string().max(300).min(1),
        vk:  z.string().max(300).min(1),
        facebook:  z.string().max(300).min(1),
        instagram:  z.string().max(300).min(1),
        twitter:  z.string().max(300).min(1),
        website:  z.string().max(300).min(1),
        youtube:  z.string().max(300).min(1),
        mainLink:  z.string().max(300).min(1),
    })
});
