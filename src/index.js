var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var body_parser = require('body-parser');
var port = process.argv[2];
var numServer = process.argv[3];

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.json());
app.use(body_parser.json());

/*
app.post('/addCovid', async (req,res) => {
    try{
        const user = await req.body.user;
        console.log(req);
        console.log(user);
    }catch(e){
        console.log(e);
        res.json(e.message);
    }
});*/

app.get('/:city',async function(req,res){
    console.log(req.params.city);
    res.json({
        message: 'get de cuidad del server: ' + numServer
    });
});

app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });
