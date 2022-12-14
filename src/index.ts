import express from 'express';
import {defaultCount, defaultPage, getPaginatedItems} from "./getPaginatedItems";
const app = express();
const port = 3001;

const jsonParseMiddleware = express.json();

app.use(jsonParseMiddleware);


const db = {
    users: [
        {
            name: "Shubert",
            id: 0,
            photos: {
                small: null,
                large: 'https://multifoto.ru/upload/medialibrary/b42/b421764c709bae30146ec4c2e9039ec6.png'
            },
            status: 'Hi! i am React JS Junior developer and I am looking for a job',
            followed: false
        },
        {
            name: "Shubert123",
            id: 1,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        },
        {
            name: "Shubert123",
            id: 2,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        },
        {
            name: "Shubert123",
            id: 3,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        },
    ],
};

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

app.get('/users', (req, res) => {
    let users = db.users;

    const { term, friend } = req.query;

    const count = Number(req.query.count) || defaultCount;
    const page = Number(req.query.page) || defaultPage;

    if (term) {
        users = users.filter((user) => {
            return user.name.indexOf(term as string) > -1
        });
    }

    if (friend !== undefined) {
        users = users.filter((user) => {
            return user.followed === JSON.parse(friend);
        });
    }

    const userLength = users.length;

    users = getPaginatedItems({items: users, count, page});


    const data = {items: users, totalCount: userLength, error: null, totalPages: userLength / count}
    res.json(data);
})

app.get('/users/:id', (req, res) => {
    const findUser = db.users.find((user) => {
        return user.id === +req.params.id;
    })
    if (findUser) {
        res.json(findUser);
        return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

app.post('/users/', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const newUser = {
        id: +(new Date()),
        name: req.body.name,
    };
    db.users.push(newUser);

    res.status(HTTP_STATUSES.CREATED_201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
    db.users = db.users.filter((user) => {
        return user.id !== +req.params.id;
    })

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.put('/users/:id', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const findUser = db.users.find((user) => {
        return user.id === +req.params.id;
    })
    if (!findUser) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    findUser.name = req.body.name
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

