function log_in(){
	var x=[];
	var length=document.getElementById("logIn_form").elements.length;

	for(var i=0;i < length; i++){
		x[i] = document.getElementById("logIn_form").elements[i].value;
	}

	var email = x[0];
	var pwd = x[1];

	var xmlhttpreq = new XMLHttpRequest();

	xmlhttpreq.open("POST", "http://localhost:3000/login", true);
	xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttpreq.send("email="+email+"&password="+pwd);

	xmlhttpreq.onreadystatechange = function() {
	  	if (xmlhttpreq.readyState == XMLHttpRequest.DONE) {
	    	if (xmlhttpreq.status == 200) {
		       	
		       	var response = JSON.stringify(xmlhttpreq.responseText);
		       	console.log("in LogIn.js "+response);
		       	if(response =='"true"'){
		       		window.location = "http://localhost:3000/home.html";
		       		//window.location.href ="http://localhost:3000/home";
		       	}
		       	else if(response == '"false"'){
		       		alert('Wrong Username or Password');
		       	}
	    	}
    	}
	}
}