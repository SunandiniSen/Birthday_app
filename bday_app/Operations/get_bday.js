var mysql = require('mysql');

module.exports ={
	get_name : function(day,month,cb){
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'birthdayDB'
		});
		var querry = 'select first_name from users where bday LIKE "%-'+month+'-'+day+'";';
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
	}
}