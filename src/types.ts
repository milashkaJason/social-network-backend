export type User = {
    _id: string,
    name: string,
    photos: {
        small: string | null,
        large: string | null
    },
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

export interface GetUsersReqQuery {
    term?: string;
    friend?: boolean;
    count?: number;
    page?: number;
}
