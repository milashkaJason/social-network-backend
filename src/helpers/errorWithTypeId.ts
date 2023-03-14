import {ServerResponse} from "../types";

export const errorWithTypeId = (id: string): ServerResponse => {
    return {
        resultCode: 0,
        errors: {
            success: false,
            error: {
                issues: [
                    {
                        code: "invalid_type",
                        expected: "ObjectId",
                        received: "any",
                        path: [
                            id
                        ],
                        message: "Expected ObjectId, received any"
                    }
                ],
                name: "ZodError"
            }
        },
        data: {},
    }
}
