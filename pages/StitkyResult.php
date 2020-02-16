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
    <?= renderSideNav(1) ?>
    <div class="w3-bar w3-gray" id="uppermenu">
      <a href=".." class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu slovník</a>
	  <a href="stitky.php" class="w3-bar-item w3-padding-16 w3-button" style="height:54px;"><i class="material-icons">keyboard_return</i></a>
	  <!-- sidenav - caller-->
      <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()" style="padding-right: 10px;padding-left: 10px;"><i class="fas fa-bars"></i></div>
	</div>
	
	
	<!-- content -->
	<div class="w3-bar">
		<p class="w3-bar-item">Slova se štítkem:</p>
	</div>
	<div class="w3-bar">
		<strong><p id="name" class="w3-bar-item"></p></strong>
	</div>
	<li class="divider"></li>
	<div class="w3-container">
		<div id="stitkyResult"></div>
	</div>



	<?= renderJSSubLinks(1, 'callerStykyResult.js') ?>
	<script>
	
    function myFunction(id) {
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }

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