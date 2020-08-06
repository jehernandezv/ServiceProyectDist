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

app.get('/api', async (req,res) => {
    try{
    await res.json({
        message: 'El servidor ' + numServer+  ' responde '
    });
    }catch(e){
        console.log(e);
        res.json(e.message);
    }
});

app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });
