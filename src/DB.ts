import {User} from "./types";

export type DB = {
    users: Array<User>
}

export const db: DB = {
    users: [
        {
            name: "Shubert",
            _id: '0',
            photos: {
                small: null,
                large: 'https://multifoto.ru/upload/medialibrary/b42/b421764c709bae30146ec4c2e9039ec6.png'
            },
            status: 'Hi! i am React JS Junior developer and I am looking for a job',
            followed: false,
            lookingForAJob: false,
            lookingForAJobDescription: "",
            fullName: "Alex Vagulis",
            contacts: {
                github: "",
                vk: "",
                facebook: "",
                instagram: "",
                twitter: "",
                website: "",
                youtube: "",
                mainLink: ""
            }
        },
        {
            name: "Shubert1",
            _id: '1',
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false,
            lookingForAJob: false,
            lookingForAJobDescription: "",
            fullName: "Alex Vagulis",
            contacts: {
                github: "",
                vk: "",
                facebook: "",
                instagram: "",
                twitter: "",
                website: "",
                youtube: "",
                mainLink: ""
            }
        },
        {
            name: "Shubert12",
            _id: '2',
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false,
            lookingForAJob: false,
            lookingForAJobDescription: "",
            fullName: "Alex Vagulis",
            contacts: {
                github: "",
                vk: "",
                facebook: "",
                instagram: "",
                twitter: "",
                website: "",
                youtube: "",
                mainLink: ""
            }
        },
        {
            name: "Shubert123",
            _id: '3',
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false,
            lookingForAJob: false,
            lookingForAJobDescription: "",
            fullName: "Alex Vagulis",
            contacts: {
                github: "",
                vk: "",
                facebook: "",
                instagram: "",
                twitter: "",
                website: "",
                youtube: "",
                mainLink: ""
            }
        },
    ],
};