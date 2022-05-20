const { response } = require("express");

var obj1 = undefined;
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = 'mongodb+srv://matthewjstewart:Sn3akySnak3@quizcluster.5oc2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DATABASE_NAME = 'Quiz-Capstone'


function getData(callback) {
    MongoClient.connect(CONNECTION_URL, async function(error,client) {
        var database = client.db(DATABASE_NAME);
        var collection = database.collection("Quiz");
        var cursor = collection.find({quizName: "HST01"}).limit(1);
        var allVals = await cursor.toArray();
        var testVar = allVals[0];
        client.close();
        console.log(client);
        callback(testVar);
    });
};

function getData2(callback) {
    MongoClient.connect(URL2, async function(error, client) {
        // var database = client.db(DB2);
        // var collection = database.collection("Animal");
        // var cursor = collection.find({animalName: "Great White Shark"}).limit(1);
        // var allVals = await cursor.toArray();
        // var testVar = allVals[0];
        // client.close();
        // console.log(testVar);
        // callback(testVar);
        console.log(client);
    })
}

   
  

module.exports = {
    getData: getData,
    getData2: getData2
};

