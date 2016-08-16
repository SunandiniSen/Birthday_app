var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var routes = require('./routes/index');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var serv = app.listen(3000,function(){
  var host = serv.address().address;
  var port =serv.address().port;
  console.log("server listening on :",host,port);
});

module.exports = app;