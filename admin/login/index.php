<?php
	include '../includer.php';
?>
<!DOCTYPE html>
<html>

<head>
	<title>Přihlášení</title>
	<meta charset="utf-8">
	<meta name="google-signin-client_id" content="636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script src="/slovnik/includeTECHNILOGIES/jquerytechnolgy.js"></script>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<script src="https://kit.fontawesome.com/5d77a8d235.js" crossorigin="anonymous"></script>
	<link rel="icon" href="/slovnik/admin/images/icons/favicon.ico" type="image/x-icon">
</head>

<body style="background-color: #be0029">
	<div
		style="width: 300px; height: 200px; margin: 0 auto; margin-top: 200px; border: 2px; border-style: solid; border-radius: 10px; border-color: rgb(155, 0, 33); background-color:white">
		<h1 style="text-align: center; margin-top: 20px;">Přihlášení</h1>
		<div style="width: 150px; height: 35px; margin: 0 auto; margin-top: 30px;" class="g-signin2"
			data-onsuccess="onSignIn"></div>
	</div>
	<div class="warning"
		style="width: 500px; height: 150px; margin: 0 auto; margin-top: 20px; border: 2px; border-style: solid; border-radius: 10px; border-color: rgb(155, 0, 33); background-color:white; display: none;">
		<h1 style="text-align: center; margin-top: 20px;">Nejste admin</h1>
		<p style="text-align: center;">Přihlašte se na jiný účet nebo <a href="mailto:matejbiza@gmail.com">kontaktujte
				admina</a></p>
		<!--<div style="width: 150px; height: 35px; margin: 0 auto; margin-top: 30px;" class="g-signin2" data-onsuccess="onSignIn"></div>-->
	</div>
	<!--<a href="#" onclick="signOut();">Sign out</a>-->
	<script>
		function onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			var id_token = googleUser.getAuthResponse().id_token;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'overeni.php');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onload = function () {
				console.log('Signed in as: ' + xhr.responseText);
				if (xhr.responseText == 'ADMIN') {
					window.location.href = "../pages/sprava_slovicek/search.php";
				} else {
					$(".warning").css("display", "block");
				}
			};
			xhr.send('id_token=' + id_token);
		}

		function signOut() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				$.ajax({
					type: "POST",
					url: "../PHP-request/logout_action.php",
					data: "",
					success: function (data) {
						console.log('User signed out.');
					}
				});
			});
		}
	</script>
</body>

</html>