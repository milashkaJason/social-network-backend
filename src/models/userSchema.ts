import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const userScheme = new Schema({
    name: {
        type: String
    },
    login: {
        type: String
    },
    token: {
        type: String
    },
    memberships: [],
    password: {
        type: String
    },
    photos: {
        small: {
            type: String,
            default: null
        },
        large: {
            type: String,
            default: null
        }
    },
    status: {
        type: String,
        default: null
    },
    followed: {
        type: Boolean,
        default: false
    },
    lookingForAJob: {
        type: Boolean,
        default: false
    },
    lookingForAJobDescription: {
        type: String,
        default: ''
    },
    fullName: {
        type: String,
        default: ''
    },
    contacts: {
        github: {
            type: String,
        default: ''
        },
        vk: {
            type: String,
        default: ''
        },
        facebook: {
            type: String,
        default: ''
        },
        instagram: {
            type: String,
        default: ''
        },
        twitter: {
            type: String,
        default: ''
        },
        website: {
            type: String,
        default: ''
        },
        youtube: {
            type: String,
        default: ''
        },
        mainLink: {
            type: String,
        default: ''
        },
    }
}, { versionKey: false });
