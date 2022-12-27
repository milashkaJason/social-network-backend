export type ProjectionGetUsers = {
    photos: true;
    name: true;
    followed: true;
    status: true;
}

export type ProjectionGetProfile = {
    photos: true,
    lookingForAJob: true,
    lookingForAJobDescription: true,
    fullName: true,
    contacts: true
}

export type ProjectionRegistration = {
    name: true;
    login: true;
}

export type ProjectionGetAuthMe = {
    email: true,
    login: true
}
