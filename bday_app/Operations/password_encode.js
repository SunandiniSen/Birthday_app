var md5 = require('md5');

module.exports = {

	encrypt_password : function(password){
		var encrypted_pwd = md5(password);
		return encrypted_pwd;s
	}
}