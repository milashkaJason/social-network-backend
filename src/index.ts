import express from 'express';
import cors from 'cors';
import {queryParser} from 'express-query-parser';
import {GetUsers} from "./controllers/GetUsers";
import {MongoClient} from "mongodb";
import {GetProfileById} from "./controllers/GetProfileById";

const app = express();
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const port = 3003;

(async () => {
    try {
        await mongoClient.connect();
        app.locals.users = mongoClient.db("usersdb").collection("users");

        // const User = mongoose.model("User", userScheme);
        // const user = new User({name: 'Alex', status: 'Hi' })
        // mongoClient.db("usersdb").collection("users").insertOne(user)


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

// app.get('/users/:id', (req, res) => {GetUsersById(req, res)})

// app.post('/users/', (req, res) => {PostUsers(req, res)})

// app.delete('/users/:id', (req, res) => {DeleteUsersById(req, res)})

// app.put('/users/:id', (req, res) => {PutUserById(req, res)})

process.on("SIGINT", async() => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});

