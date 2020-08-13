const MongoClient = require("mongodb").MongoClient;
const params = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
const dbConnectionUrl = "mongodb+srv://kamil018:12345@dbprojectone.jxqa9.mongodb.net/projectFinal?retryWrites=true&w=majority";

function initialize(dbName, dbCollectionName, successCallback,failureCallback) {
    MongoClient.connect(dbConnectionUrl, params ,function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};