<?php
	include '../includer.php';
?>
<!DOCTYPE html>
<html>

<head>
	<meta name="google-signin-client_id" content="636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com">
	<!--<script src="https://apis.google.com/js/platform.js" async defer></script>-->
	<?= renderHead("ADMIN", 1) ?>

</head>

<body>
	<a href="sprava_slovicek/search.php">Správa slovíček</a>
	<a href="sprava_uzivatelu/users.php">Správa uživatelů</a>
	<!--<a href="#" id="logout">Sign out</a> 
	<a href="#" id="logout">Sign out</a>-->
	<script>
		function signOut() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function() {
				$.ajax({
					type: "POST",
					url: "../PHP-request/logout_action.php",
					data: "",
					success: function(data) {
						console.log('User signed out.');
						window.location.href = "/slovnik/admin/login/";
					}
				});
			});
		}

		function onLoad() {
			gapi.load('auth2', function() {
				gapi.auth2.init();
			});
		}
	</script>
	<a href="#" onclick="signOut();">Sign out</a>

	<?=renderJsLink(1,"")?>
</body>

</html>