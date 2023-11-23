const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const path = require('path');
const crypto = require('crypto');
const config = require('./config');
const mytoken = require('./app/myToken/myToken');
const cors = require('cors');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/app'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});
app.use(morgan('dev'));



const apiRouter = require('./app/routes/api')(express, mysql, crypto, mytoken);
app.use(cors({
    origin: '*'
}));
app.use('/api', apiRouter);
const authRouter = require('./app/routes/Authenticate/apiAuthenticate')(express, mysql, crypto, mytoken);
app.use('/authenticate', authRouter);



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/index.html'));
});


app.listen(config.port);
console.log('Running on port ' + config.port);