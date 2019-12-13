<?php
  include '../../includer.php';
?>
<!DOCTYPE html>
<html>
<head>
	<?=renderHead("Správa uživatelů", 2)?>
</head>
<body>
	<h1>Správa uživatelů</h1>
	<div class="users"></div>
    <?=renderJsLink(2, "users.js")?>
</body>
</html>