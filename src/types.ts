import { z } from 'zod';
import {ObjectId} from "mongodb";

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
