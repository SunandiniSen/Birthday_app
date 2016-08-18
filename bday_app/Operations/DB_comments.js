var mysql = require('mysql');

module.exports={
	insert_comments : function(message,session,cb){
		var comment = message.comment;
		var eid = session.email;
		var connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'birthdayDB'
		});

		var querry = 'insert into comments values("'+eid+'","'+comment+'");';

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

	show_comments : function(date,month,cb){
		var connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'birthdayDB'
		});
		var querry = 'select comment from comments where date LIKE "%-'+month+'-'+date+'";';

	}
}