## Deploy and installation

```bash
docker-compose up -d
```

## Test credentials

login: test

password: 123123

## Registration

POST

```json
{
"login": "test",
"password": "123123",
"name": "name"
}
```

## Errors

- on field validation

```
{
    data: {},
    resultCode: 1,
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
                    "message": "Expected ObjectId, received any"
                }
            ],
            name: "ZodError"
        }
    },
}
```
   
- failed request

```
{
    data: {},
    resultCode: 1,
    errors: {
        success: false,
        error: {
            issues: [
                {
                    "message": "Пользователь не найден"
                }
            ],
            name: "serverError"
        }
    },
}
```
