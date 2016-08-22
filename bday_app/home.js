
	xmlhttpreq = new XMLHttpRequest();

    console.log('In Home');

    xmlhttpreq.open("POST", "http://localhost:3000/home", true);
	xmlhttpreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttpreq.send(" ");

	xmlhttpreq.onreadystatechange = function() {
	  	if (xmlhttpreq.readyState == XMLHttpRequest.DONE) {
	    	if (xmlhttpreq.status == 200) {
		       	
		       	//var response = JSON.stringify(xmlhttpreq.responseText);
		       	//var response = xmlhttpreq.responseText.email;
		       	var response = JSON.parse(xmlhttpreq.responseText);
		       	console.log('in Home.js '+response);
		       	document.getElementById('welcome_msg').innerHTML = "Welcome "+response.email;
		       	
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
					var path = xmlhttpreq.responseText.path;
					var Img = new Image();
					Img.src = response;
					document.images[0].src = Img.src;
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

	function upload_pic(){
		var form_data = new FormData();
		var file = document.getElementById('profile_pic');
		var pic = file.files[0];
		form_data.append('profile_pic',pic,pic.name);

		var xmlhttpreq = new XMLHttpRequest();
		xmlhttpreq.open("POST","http://localhost:3000/upload_pic",true);
		xmlhttpreq.send(form_data);

	}

  window.onload = function() {

  	var file = document.getElementById('profile_pic');
  	var display = document.getElementById('profile_pic_frame');

  	file.addEventListener('change',function(e){
  		var pic = file.files[0];
  		console.log('pic='+pic);
  		var reader = new FileReader();
  		reader.onload = function(e) {
			//display.innerHTML = "";

			var img = new Image();
			img.src = reader.result;
			console.log('url:'+img.src);

			//display.appendChild(img);
			document.images[0].src = img.src;
		}

		reader.readAsDataURL(pic);	
		console.log('pic='+JSON.stringify(pic));
  	});
  }