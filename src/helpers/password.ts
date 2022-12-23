import bcrypt from "bcrypt";

export const hashPassword = (val: string) => {
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(val, salt)
}
