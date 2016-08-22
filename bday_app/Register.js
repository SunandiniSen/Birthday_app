var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var multer = require('multer');
var DB = require('../Operations/DB_access.js');
var com = require('../Operations/DB_comments.js');
var get_bday = require('../Operations/get_bday.js');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: './uploads/'}).single('profile_pic'));
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
	var names,path,msg;
	console.log('date:'+day+' month:'+month);

	var profile_pic = DB.get_photo(sess, function(err,data){
		if(!err){
			console.log(data);
			var profile = data;
		}
		else
			console.log('error');
	});

	var bday = get_bday.get_name(day,month,function(err,data){
		if(!err){
			console.log(data);
			names = data;
		}
		else
			console.log('error');
	});
	var bday_photo = get_bday.get_photo(sess.email,function(err,data){
		if(!err){
			path = data;
			console.log(path);
			var message = '{"email" : "'+sess.email+'","path" : "'+path+'","names" : "'+names+'"}';
			msg = JSON.parse(message);
			console.log(msg);
			//res.send(path);
			res.send(msg);
		}
		else{
			console.log('Error');
			res.send('Error');
		}
	});
	/*if(sess.email){
		res.send('Welcome '+sess.email);
	}*/
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
	
	var path = req.file.path;
	//var path = req.body.path;
	console.log('path:'+path);
	console.log(JSON.stringify(path));
	sess =req.session;
	//console.log('name:'+JSON.stringify(req.file.orignalname));
	var name = req.file.originalname;
	console.log('name:' +name);
	var old_path = './'+path;
	var new_path = './uploads/'+ name;
	sess =req.session;
	fs.rename(old_path, new_path, function(err) {
        if (err) throw err;
        fs.unlink(old_path, function() {
            if (err) throw err;
            var update_path = DB.store_path(new_path,sess,function(err,data){
            	if(!err)
            		console.log("successful in updating path");
            	else
            		console.log("Error");
            });
            res.send(new_path);
        });
    });
    /*var name = JSON.stringify(path).split("\\");
    console.log(name);
    var length = name.length;
    var file_name = name[length-1];
    var file_name = file_name.split('"');
    var new_path = './uploads/'+file_name[0];
    var update_path = DB.store_path(new_path,sess,function(err,data){
    	if(!err){
    		console.log("successful in updating path");
    		res.send(new_path);
    	}
    	else{
    		console.log("Error");
    		res.send('Error');
    	} 
    });

    console.log(file_name);*/
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
	

