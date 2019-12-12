<?php
include "../includer.php";
?>
<!DOCTYPE html>
<html lang="cs">

<head>
	<!-- TODO Add name of website (meta tags) based on what he searched -->
	<?= renderHead('Štítky', 1) ?>
</head>

<body>
    <p id="name"></p>
	<div id="stitkyResult"></div>



	<?= renderJSSubLinks(1, 'callerStykyResult.js') ?>
</body>

</html>