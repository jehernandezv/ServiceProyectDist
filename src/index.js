require('dotenv').config();
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const fs = require('fs');
const uuid = require('uuid').v4;

var port = process.argv[2];
var numServer = process.argv[3];
var app = express();

const db = require('./database');
const dbName = "projectFinal";
const collectionName = "patients";

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

db.initialize(dbName, collectionName, function (dbCollection) {
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(multer({ storage }).single('image'));
    app.use(bodyParser.json());
    cloudinary.config({
        cloud_name: 'drh8926tv',
        api_key: '296114521285185',
        api_secret: 'qBb8TnYd7X9f7LdnyEbXjs5SqMs'
    });

    app.get('/', function (req, res) {
        res.json({
            message: 'el server: ' + numServer + ' respondio'
        })
    });
    //traer todos los casos mostrar grafica


    //traer todos los casos mostrar grafica
    app.get('/all', function (req, res) {
        res.json({
            message: 'traer todos los casos registrados de cache'
        })
    });
    //reporte por cuidad en PDF
    app.get('/generatePDF/:city', function (req, res) {
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    //registra casos
    app.post('/addCovid', async (req, res) => {
        try {
            console.log(req.body.name);
            console.log(req.file.originalname);
            console.log(req.body.city);
            const upload = await cloudinary.v2.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
            console.log('Se ha guardado un paciente')
            const item = {
                name: req.body.name,
                city: req.body.city,
                originalname: upload.url
            };
            dbCollection.insertOne(item, (error, result) => {
                if (error) throw error;
            });

            res.json({
                message: 'Se ha guardado un paciente'
            })
        } catch (e) {
            console.log(e);
            res.json(e.message);
        }
    });
}, function (err) {
    throw (err);
});

app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
});