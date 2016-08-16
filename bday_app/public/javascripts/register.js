function reg(){
	var x=[];
	var data="";
	var btn=[];
	var length=document.getElementById("registration_form").elements.length;

	for (var i = 0; i < length ; i++) {
		x[i] = document.getElementById("registration_form").elements[i].value;
		data=data + document.getElementById("registration_form").elements[i].value +" ";
	}
	var firstname = x[0];
	var lastname = x[1];
	var email = x[2];
	var pwd = x[3];
	var phn =x[4];
	var bday =x[5];
	btn = document.getElementsByTagName("button");
	var btn_clicked;

	for(var i =0; i < btn.length; i++ ){
		btn.onclick = function(){
			btn_clicked = this.value;
		}
	}
	console.log('Button clicked :'+btn_clicked);

	/*if(firstname.length==0||lastname.length==0||phn.length==0||email.length==0 || pwd.length==0){
		alert("Please fill all fields");
	}

	else{*/
		var xmlhttpreq = new XMLHttpRequest();

		xmlhttpreq.open("POST", "http://localhost:3000/register", true);
		xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xmlhttpreq.send("firstName="+firstname+"&lastName="+lastname+"&email="+email+"&password="+pwd+"&phn="+phn+"&bday="+bday);

		xmlhttpreq.onreadystatechange = function() {
	      if (xmlhttpreq.readyState == XMLHttpRequest.DONE) {
	        if (xmlhttpreq.status == 200) {
	        	//var response = JSON.parse(xmlhttpreq.responseText);
	        	//window.location = "http://www.youtube.com/?name="+response.firstName;
	        	window.location = "http://localhost:3000/LogIn.html";
	        	//console.log(JSON.stringify(response));
	        	}
	        }
	    }
}
