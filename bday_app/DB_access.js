var mysql = require('mysql');
var encrypt = require('./password_encode.js');

module.exports={
	
	insert_into_DB : function (message, cb){

		var first_name = message.firstName;
		var last_name = message.lastName;
		var email = message.email;
		var password = encrypt.encrypt_password(message.password);
		var phn = message.phn;
		var bday = message.bday;
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'birthdayDB'
		});

		//var querry = 'insert into users values("'+first_name+'","'+last_name+'","'+email+'","'+password+'","'+phn+'");';
		var querry = 'insert into users values("'+first_name+'","'+last_name+'","'+email+'","'+password+'","'+phn+'","'+bday+'");';
		console.log(querry);

		connection.connect(function(err){
			if(!err) {
			    console.log("Database is connected ... ");    
			} else {
			    console.log("Error connecting database ... ");    
			}
		});

		connection.query(querry, function(err, rows, fields) {
			connection.end();
			if (!err)
				return cb(null, 'Database updated');
			 else
			   return cb(err, 'Error while performing Query.');
		});
	},

	authenticate_user : function(message,cb){
		var email = message.email;
		var password = message.password;
		var encrypted_pwd = encrypt.encrypt_password(password);
		var pwd_fromDB;

		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'birthdayDB'
		});

		var querry = 'SELECT `password` FROM `users` WHERE `e-id`="'+email+'";';
		console.log(querry);

		connection.query(querry, function(err, rows, fields){
			connection.end();
			if(!err){
				if(rows.length > 0){
					pwd_fromDB = rows[0]['password'];
					/*console.log(rows.length);
					for (var i in rows) {
				        console.log(rows[i]);
				    }*/
					console.log('password :'+pwd_fromDB);
					if(pwd_fromDB === encrypted_pwd){
						return cb(null,true);
					}else{
						return cb(null,false);
					}
				}else{
					return cb(null,false);
				}
			}
			else
				return cb(err, 'Error while performing query');

		});
	},

	store_path : function(path,message,cb){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'birthdayDB'
		});
		var email = message.email;
		var querry = 'UPDATE users SET `path`="'+path+'" WHERE `e-id`="'+email+'";';
		console.log(querry);
		connection.query(querry, function(err,rows){
			if(!err){
				return cb(null,'OK');
			}else{
				return cb(null,'Error');
			}
		});
	},

	get_photo : function(message,cb){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'birthdayDB'
		});
		var email = message.email;
		var querry = 'SELECT `path` FROM `users` WHERE `e-id`="'+email+'";';
		connection.query(querry,function(err,rows){
			if(!err){
				return cb(null,rows);
			}else{
				return cb(null,'Error');
			}
		});
	}
};