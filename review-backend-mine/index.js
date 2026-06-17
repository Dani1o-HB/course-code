import dns from "dns";
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from 'dotenv'
import ReviewsDAO from "./dao/reviewsDAO.js"

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.6j4mref.mongodb.net/?appName=Cluster0`;

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    })