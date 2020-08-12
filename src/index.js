var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.argv[2];
var numServer = process.argv[3];

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/test', function (req, res) {
    if (!req.body)
        return res.sendStatus(400)
    console.log(req.body);

    var user = req.body.user;
    res.send('Bienvenido ' + user)
})

app.listen(port, function () {
    console.log('Example app server ubuntu1 listening on port ' + port + '!');
  });
