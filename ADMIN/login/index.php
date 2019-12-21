<?php
	include '../includer.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>login</title>
	<meta charset="utf-8">
	<meta name="google-signin-client_id" content="636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
	<div style="width: 300px; height: 200px; margin: 0 auto; margin-top: 200px; border: 2px; border-style: solid; border-radius: 10px; border-color: grey;">
		<h1 style="text-align: center; margin-top: 20px;">Přihlášení</h1>
		<div style="width: 150px; height: 35px; margin: 0 auto; margin-top: 30px;" class="g-signin2" data-onsuccess="onSignIn"></div>
	</div>
	<!--<a href="#" onclick="signOut();">Sign out</a>-->
	<script>
		function onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			var id_token = googleUser.getAuthResponse().id_token;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'overeni.php');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onload = function() {
			  console.log('Signed in as: ' + xhr.responseText);
			  window.location.href  = "../pages";
			};
			xhr.send('id_token='+id_token);
		}
	  	function signOut() {
	    	var auth2 = gapi.auth2.getAuthInstance();
	    	auth2.signOut().then(function () {
	      		$.ajax({
			      type: "POST",
			      url: "../PHP-request/logout_action2.php",
			      data: "",
			      success: function(data) {
			      	console.log('User signed out.');  
			      }
			    });
	    	});
	  	}
	  	/*
	  	$( "#logout" ).click(function() {
			$.ajax({
		      type: "POST",
		      url: "../PHP-request/logout_action.php",
		      data: "",
		      success: function(data) {
		      	console.log('User signed out.');
		      	window.location.href = "https://matejbiza.cz/slovnik/admin/login/";
		      }
		    });
		});
		*/
	</script>
</body>
</html>