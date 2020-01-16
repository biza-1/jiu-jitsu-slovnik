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
	
</div>
<div class="w3-bar w3-gray">
	<a href="sprava_slovicek/search.php" class="w3-bar-item w3-button w3-padding-16" style="padding-left: 5px;padding-right: 5px;">Správa slovíček</a>
	<a href="sprava_uzivatelu/users.php" class="w3-bar-item w3-button w3-padding-16" style="padding-left: 5px;padding-right: 5px;">Správa uživatelů</a>
	<a href="#" onclick="signOut();" class="w3-bar-item w3-button w3-padding-16 w3-right"  style="padding-left: 5px;padding-right: 5px;">Sign out</a>
</div>

	<!--<a href="#" id="logout">Sign out</a> padding-left: 0;padding-right: 0;
	<a href="#" id="logout">Sign out</a>-->
	<script>
		
	</script>

	<?=renderJsLink(1,"")?>
</body>

</html>