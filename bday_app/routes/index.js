var express = require('express');
var app = express();

var server = require('../server/Register.js');

app.use('/',server);

module.exports =app;