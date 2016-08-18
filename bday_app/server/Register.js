var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var DB = require('../Operations/DB_access.js');
var com = require('../Operations/DB_comments.js');
var get_bday = require('../Operations/get_bday.js');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'current_session'}));

var sess;

app.post('/register',function(req,res){
	var msg = req.body;
	var message = DB.insert_into_DB(msg, function(err, data){
		if(!err){
			res.send(data);
			console.log('OK');
		}else{
			console.log('Error');
			res.send(err);
		}
	});
	
});

app.post('/login',function(req,res){
	var msg = req.body;
	sess = req.session;
	sess.email = req.body.email;
	var mail = JSON.stringify(sess.email);
	console.log('In login:'+mail);
	var authenticate = DB.authenticate_user(msg, function(err, data){
		if(!err){
			res.send(data);
			console.log('Ok in LogIn');
		}else{
			res.send(err);
		}
	});
});

app.post('/home',function(req,res){
	//var msg = req.body;
	console.log('in home');
	sess = req.session;
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth();
	console.log('date:'+day+' month:'+month);
	var bday = get_bday.get_name(day,month,function(err,data){
		if(!err)
			console.log(data);
		else
			console.log('error');
	});
	if(sess.email){
		res.send('Welcome '+sess.email);
	}
});

app.get('/logout',function(req,res){
	console.log('in logout');
	req.session.destroy(function(err){
		if(err){
			console.log('error');
			res.send('error');
		}else{
			res.send('logout');
		}
	});
});

app.post('/upload_pic',function(req, res){
	//var path = req.files.profile_pic.path;
	var path = req.files['profile_pic'];
	console.log('path:'+path);
	/*var new_path = './public/images/'+ req.files.profile_pic.name;
	fs.rename(path, new_path, function(err) {
        if (err) throw err;
        fs.unlink(path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + new_path + ' - ' + req.files.profile_pic.size + ' bytes');
        });
    });*/
});
app.post('/comment',function(req,res){
	console.log('in comment');
	sess = req.session;
	var msg = req.body;
	console.log(msg);
	var string = JSON.stringify(msg.comment);
	console.log('comment'+string);
	var insert = com.insert_comments(msg,sess,function(err,data){
		if(!err)
			res.send(data);
		else
			res.send(err);
	});
	//res.send('okay');
});

module.exports = app;
	

