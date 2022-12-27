import express from 'express';
import cors from 'cors';
import {queryParser} from 'express-query-parser';
import {GetUsers} from "./controllers/GetUsers";
import {MongoClient} from "mongodb";
import {GetProfileById} from "./controllers/GetProfileById";
import {Registration} from "./controllers/Registration";
import * as dotenv from 'dotenv';
import {GetAuthMe} from "./controllers/GetAuthMe";
import {PostAuthLogin} from "./controllers/PostAuthLogin";
import {GetFollow} from "./controllers/GetFollow";
import {PostFollow} from "./controllers/PostFollow";
import {DeleteFollow} from "./controllers/DeleteFollow";

dotenv.config();

const port = process.env.MAIN_PORT;
const dbUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const dbPwd = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbPort = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;
const dbCollection = 'users';

const app = express();

const mongoClient = new MongoClient(
    `mongodb://${dbUser}:${dbPwd}@mongodb:${dbPort}/`
);


(async () => {
    try {
        await mongoClient.connect();
        app.locals.users = mongoClient.db(dbName).collection(dbCollection);
        app.listen(port);
        console.log(`Example app listening on port ${port}`);
    }catch(err) {
        return console.log(err);
    }
})();


const jsonParseMiddleware = express.json();

app.use(jsonParseMiddleware);
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
)
app.use(cors())


app.get('/users', (req, res) => {GetUsers(req, res)})

app.get('/profile/:id', (req, res) => {GetProfileById(req, res)})

app.post('/registration/', (req, res) => {Registration(req, res)})

app.get('/auth/me/', (req, res) => {GetAuthMe(req, res)})

app.post('/auth/login/', (req, res) => {PostAuthLogin(req, res)})

app.get('/follow/:id', (req, res) => {GetFollow(req, res)})

app.post('/follow/:id', (req, res) => {PostFollow(req, res)})

app.delete('/follow/:id', (req, res) => {DeleteFollow(req, res)})

// app.get('/users/:id', (req, res) => {GetUsersById(req, res)})

// app.post('/users/', (req, res) => {PostUsers(req, res)})

// app.delete('/users/:id', (req, res) => {DeleteUsersById(req, res)})

// app.put('/users/:id', (req, res) => {PutUserById(req, res)})

process.on("SIGINT", async() => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});

