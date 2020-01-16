<?php
include '../../includer.php';
?>
<!DOCTYPE html>
<html lang="cs">

<head>
	<?= renderHead("Správa uživatelů", 2) ?>
</head>

<body>
	<!--sidenav-->
<div class="w3-sidebar w3-bar-block w3-white w3-animate-right" style="display:none;z-index:4; right:0;background-color:#be0029 !important;" id="mySidebar">
  <img class="w3-bar-item" src="<?=$_SESSION['userINFO']['picture']?>" alt="Obrázek uživatele" style="width:120px; margin:auto; border-radius:50%;">
  <div class="w3-bar-item" style="padding-bottom:0;color:white"><?=$_SESSION['userINFO']['email']?></div>
  <div class="w3-bar-item" style="padding-top:0;color:white"><?= $_SESSION['userINFO']['name']." ".$_SESSION['userINFO']['surname']?></div>
  <li class="divider"></li>
  <a href="#" onclick="signOut();" class="w3-bar-item w3-button w3-padding-16">Odhlásit se</a>
  <li class="divider"></li>
  <a href="../sprava_slovicek/search.php" class="w3-bar-item w3-button w3-padding-16">Správa slovíček</a>
  <li class="divider"></li>
</div>
<div class="w3-overlay" onclick="w3_close()" style="cursor:pointer" id="myOverlay"></div>

	<div class="w3-bar w3-gray">
		<div class="w3-bar-item w3-padding-16" id="sprava_uzivatelu">Správa uživatelů</div>
		<div class="w3-bar-item" id='searchDIV' style='width:40%'><input type="search" name="search" id="search" style="color:black;"></div>  <!--odhlaseni--> 
  		<button class="w3-button w3-gray w3-padding-16 w3-right" onclick="w3_open()" >☰</button>
	</div>
	<div class="w3-container">
		<div class="pagination"></div>
		<div id="users"></div>
		<div class="pagination"></div>
		<!--<div class="users"  style='margin-left:5px'></div>-->
	</div>
	<?= basic_modal() ?>
	<?= renderJsLink(2, "users.js") ?>
	<script>
	
    function w3_open() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    }
	</script>
</body>

</html>