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
const { jsPDF } = require("jspdf"); // will automatically load the node version
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));


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
    app.use(express.static('./public/uploads/'));
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

    //traer todos los casos mostrar grafica
    app.get('/', function (req, res) {
        res.json({
            message: 'el server: ' + numServer + ' respondio'
        })
    });


    //traer todos los casos mostrar grafica
    app.get('/all', function (req, res) {
        res.json({
            message: 'traer todos los casos registrados de cache'
        })
    });

    //reporte por cuidad en PDF
    app.get('/generatePDF/:city', async function (req, res) {
        const doc = new jsPDF();
        const city = req.params.city;

        doc.setFontSize(30)
        doc.text(20, 20, '¡Estos son los pacientes de ' + city + '!', { align: "left" });
        doc.setFontSize(15);
        
        dbCollection.find({ city: city }, { name: 1, originalname: 2 }).toArray((error, result) => {
            if (error) throw error;
            var pos = 40;
            for (let index = 0; index < result.length; index++) {
                const element = result[index];

                doc.text(20, pos,index + 1 + '   -   ' + element.name, { align: "left" });
                pos += 10;
            }
            doc.text(20, pos + 20, 'CASOS TOTALES: ' + result.length + '!');
            doc.save(path.join(__dirname, './public/uploads/Test.pdf'), function (err) { console.log('saved!'); });
        });
        
        await snooze(150);
        res.sendFile(path.join(__dirname, './public/uploads/Test.pdf'));
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