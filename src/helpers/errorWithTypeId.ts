export const errorWithTypeId = (id: string) => {
    return {
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
                    "message": "Expected ObjectId, received any"
                }
            ],
            name: "ZodError"
        }
    }
}
