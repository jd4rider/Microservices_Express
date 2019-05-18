require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');


// const MongoClient = require(‘mongodb’).MongoClient;
// const uri = "mongodb+srv://jd4rider:<password>@microservicesblog-rsn83.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true
// });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
var db;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


MongoClient.connect('mongodb+srv://jd4rider:'+process.env.DBPASSWORD+'@microservicesblog-rsn83.mongodb.net/test?retryWrites=true', (err,client) => {
    if(err) return console.log(err)
    db = client.db('test')
    app.listen(3000, function () {
        console.log('listening on 3000')
    })
})

console.log('May Node be with you');

app.post('/blog', (req, res) => {
    console.log(req.body)
    try {
        db.collection('blog').insertOne(req.body)
    } catch(e) {
        console.log(e);
    }
    res.end('It worked!');
})

app.post('/delete', (req, res) => {
    console.log(req.body.id)
    try {
        db.collection('blog').deleteOne({'_id': ObjectID(req.body.id)})
    } catch (e) {
        console.log(e);
    }
    res.end('Delete worked!');
})

app.get('/', function(req, res){
    res.send('Hello World');
})

app.get('/blog', function (req, res) {
    let values = db.collection('blog').find().sort({date: -1});
    values.toArray(function(err, result){
        res.json(result);
    })
})