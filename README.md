Можно зарегистрироваться или зайти из под юзера ```test``` ```123123```

registration POST ```{
"login": "test",
"password": "123123",
"name": "name"
}```


###Чтобы запустить проект `docker-compose up -d`


## Может быть два вида ошибок
1. Если ошибка валидации полей
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
   
2. При неуспешном запросе
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
