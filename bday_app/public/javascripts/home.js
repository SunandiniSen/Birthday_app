/*document.getElementById('getval').addEventListener('change', readURL, true);
function readURL(){
   var file = document.getElementById("getval").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      document.getElementById('clock').style.backgroundImage = "url(" + reader.result + ")";        
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}*/
	xmlhttpreq = new XMLHttpRequest();

    console.log('In Home');

    xmlhttpreq.open("POST", "http://localhost:3000/home", true);
	xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttpreq.send(" ");

	xmlhttpreq.onreadystatechange = function() {
	  	if (xmlhttpreq.readyState == XMLHttpRequest.DONE) {
	    	if (xmlhttpreq.status == 200) {
		       	
		       	var response = JSON.stringify(xmlhttpreq.responseText);
		       	console.log('in Home.js '+response);
		       	document.getElementById('welcome_msg').innerHTML = response;
		       	
	    	}
    	}
	}
	
	function comment(){
		xmlhttpreq.open("POST", "http://localhost:3000/comment",true);
		var message = document.getElementById('msg').value;
		console.log('message:'+message);
		xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttpreq.send("comment="+message);

		xmlhttpreq.onreadystatechange = function(){
			if(xmlhttpreq.readyState ==XMLHttpRequest.DONE){
				if(xmlhttpreq.status == 200){
					var response =JSON.stringify(xmlhttpreq.responseText);
					console.log('comment:'+response);
				}
			}
		}
	}

	function logout(){
		xmlhttpreq.open("GET", "http://localhost:3000/logout", true);
		xmlhttpreq.send(" ");

		xmlhttpreq.onreadystatechange = function(){
			if(xmlhttpreq.readyState == XMLHttpRequest.DONE){
				if(xmlhttpreq.status == 200){
					var response = JSON.stringify(xmlhttpreq.responseText);
					console.log('in logout: '+response);
					if(response === '"logout"'){
						window.location = "http://localhost:3000/LogIn.html";
					}
				}
			}
		}
	}
	/*function upload_pic(){

	}*/