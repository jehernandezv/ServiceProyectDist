var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const multer = require('multer');
require('./database');
const Patient = require('./models/Patient');
const uuid = require('uuid').v4;
var port = process.argv[2];
var numServer = process.argv[3];



var app = express();
const storage = null;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({storage}).single('image'));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.json({
        message:'el server: ' + numServer + ' respondio'
    })
});

//traer todos los casos mostrar grafica
app.get('/all',function(req,res){
    res.json({
        message:'traer todos los casos registrados de cache'
    })
});

//reporte por cuidad en PDF
app.get('/:city',function(req,res){
    console.log(req.params.city);
    res.json({
        message: 'get de cuidad del server: ' + numServer
    });
});

//registra casos
app.post('/addCovid', (req,res) => {
    try{

        console.log(req.body.name);
        console.log(req.file.originalname);
        console.log(req.body.city);

        const patient = new Patient({
            name:req.body.name,
            city:req.body.city,
            UrlImage:uuid()
        });

        patient.save();
        console.log('Se ha guardado un paciente')

        res.json({
            message:'Se ha guardado un paciente'
        })
    }catch(e){
        console.log(e);
        res.json(e.message);
    }
});



app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });