import bcrypt from "bcrypt";

export const hashPassword = (val: string) => {
    const salt = '$2b$10$b2aqrKp3hQCgiUvRxMnCPe';

    return  bcrypt.hashSync(val, salt)
}
