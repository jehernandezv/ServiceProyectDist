/*const mongoose = require('mongoose');

mongoose.connect('mongodb://root:123456@192.168.0.114:27017/projectFinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is conected')).catch(err => console.log(err));*/


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kamil018:12345@dbprojectone.jxqa9.mongodb.net/projectFinal?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("patients");
  // perform actions on the collection object
  client.close();
}).then(() => console.log('db is conected')).catch(err => console.log(err));
