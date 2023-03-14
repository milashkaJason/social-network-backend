Можно зарегистрироваться или зайти из под юзера ```test``` ```123123```

registration POST ```{
"login": "test",
"password": "123123",
"name": "name"
}```


###Чтобы запустить проект `docker-compose up -d`


## Может быть два вида ошибок
1. Если ошибка валидации полей
   ```{
   "success": false,
      "error": {
         "issues": [
            {
               "code": "invalid_type",
               "expected": "string",
               "received": "number",
               "path": [
                  "term"
               ],
               "message": "Expected string, received number"
            }
         ],
      "name": "ZodError"
      }
   }```
   
2. При неуспешном запросе
    ```
    {error: {messages: [`Пользователь не найден`]}}
   ```
