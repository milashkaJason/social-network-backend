import {ServerErrors} from "../types";

export const generateServerErrors = (messageArr: Array<string>): ServerErrors => {
    const issues = messageArr.map(message => {
        return {message}
    })

    return {
        success: false,
        error: {
            issues: issues,
            name: "serverError"
        }
    }
}