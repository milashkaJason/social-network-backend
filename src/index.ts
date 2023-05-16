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
import * as fs from "fs";
import {Auth} from "./controllers/Auth";
import {GetStatusById} from "./controllers/GetStatusById";
import {PutStatus} from "./controllers/PutStatus";
import {DeleteAuthLogin} from "./controllers/DeleteAuthLogin";
import {PutProfile} from "./controllers/PutProfile";
import {PutPhoto} from "./controllers/PutPhoto";
import {GetUploads} from "./controllers/GetUploads";
const fileUpload = require('express-fileupload');

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

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000, // Around 10MB
        },
        abortOnLimit: true,
    })
);
app.use(jsonParseMiddleware);
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true
    })
)
app.use(cors());

app.use(function(request, response, next){

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n",(function() {}));
    next();
});


app.get('/users', (req, res) => {GetUsers(req, res)})

app.get('/profile/:id', (req, res) => {GetProfileById(req, res)})

app.get('/profile/status/:id', (req, res) => {GetStatusById(req, res)})

app.put('/profile', Auth, (req, res) => {PutProfile(req, res)})

app.put('/profile/status/', Auth, (req, res) => {PutStatus(req, res)})

app.put('/profile/photo/', Auth, (req, res) => {PutPhoto(req, res)})

app.get('/uploads/:photoName', (req, res) => {GetUploads(req, res)})

app.post('/registration/', (req, res) => {Registration(req, res)})

app.get('/auth/me/', Auth, (req, res) => {GetAuthMe(req, res)})

app.post('/auth/login/', (req, res) => {PostAuthLogin(req, res)})

app.delete('/auth/login/', Auth, (req, res) => {DeleteAuthLogin(req, res)})

app.get('/follow/:id', Auth, (req, res) => {GetFollow(req, res)})

app.post('/follow/:id', Auth, (req, res) => {PostFollow(req, res)})

app.delete('/follow/:id', Auth, (req, res) => {DeleteFollow(req, res)})

process.on("SIGINT", async() => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});

