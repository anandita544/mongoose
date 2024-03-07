const mongoose = require("mongoose");
const mongodb = require("mongodb");
let db;
async function getdata() {
    if (db) {
        return db;
    }
    const client = new mongodb.MongoClient("mongodb://localhost:27017");
    try {
        await client.connect();
        db = client.db("movies");

        return db;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = getdata;
