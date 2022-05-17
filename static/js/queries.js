const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://matthewjstewart:<m38952sR3dHawk>@animal-cluster.r1qzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = 'Animal_Crossing';

function getAllAnimals(callback) {
    console.log("hello");
    MongoClient.connect(CONNECTION_URL, async function(error, client) {
        console.log("connected?");
        var database = client.db(DATABASE_NAME);
        var collection = database.collection("Animals");
        var cursor = collection.find({});
        var allVals = await cursor.toArray();
        client.close();
        callback(allVals);
    })
} 

module.exports = {
    getAllAnimals: getAllAnimals
};


// function getData(testP, callback) {
//     MongoClient.connect(CONNECTION_URL, async function(error,client) {
//         var database = client.db(DATABASE_NAME);
//         var collection = database.collection("Quiz");
//         var cursor = collection.find({quizName: testP}).limit(1);
//         var allVals = await cursor.toArray();
//         var testVar = allVals[0];
//         client.close();
//         console.log(chalk.red(testP))
//         callback(testVar);
//     });
// };