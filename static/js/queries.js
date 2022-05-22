const { response } = require("express");
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = 'mongodb+srv://matthewjstewart:Sn3akySnak3@animalcluster.dphuu.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'Collectables'

function getData(callback) {
    MongoClient.connect(CONNECTION_URL, async function(error,client) {
        var database = client.db(DATABASE_NAME);
        var collection = database.collection("animals");
        var cursor = collection.find({}, {projection: {_id: 0}});
        var allVals = await cursor.toArray();
        client.close();
        callback(allVals);
    });
};

const url2 = "mongodb+srv://mattStewart:Sn3akySnak3@animalcluster.r1qzy.mongodb.net/?retryWrites=true&w=majority";
const databasename = "Coll";

function getData2(callback) {
    MongoClient.connect(url2, async function(error,client) {
        var database = client.db(databasename);
        var collection = database.collection("animal");
        var cursor = collection.find({name: "Great White Shark"}).limit(1);
        var allVals = await cursor.toArray();
        var testVar = allVals[0];
        client.close();
        console.log(testVar);
        callback(testVar);
    });
};



module.exports = {
    getData: getData,
    getData2: getData2
};

