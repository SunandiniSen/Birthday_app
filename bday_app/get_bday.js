var mysql = require('mysql');

module.exports ={
	get_name : function(day,month,cb){
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'birthdayDB'
		});
		var mnth = parseInt(month);
		if(mnth<10)
			month='0'+month;
		var querry = 'SELECT `first_name`,`path` from users WHERE `bday` LIKE "%-'+month+'-'+day+'";';
		console.log(querry);
		connection.query(querry,function(err, rows){
			if(!err){
				if(rows.length > 0)
					return cb(null,rows);
				else
					return cb(null,'No matches');
			}
			else
				return cb(err,'Error');
		});
	},

	get_photo : function(eid,cb){
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'birthdayDB'
		});
		var querry = 'SELECT `path` from users WHERE `e-id`="'+eid+'";';
		console.log(querry);
		connection.query(querry,function(err,rows){
			if(!err){
				return cb(null,rows);
			}
			else
				return cb(err,'Error');
		});
	}
}