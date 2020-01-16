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
      <a href=".." class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu</a>
      <!-- sidenav - caller-->
      <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()" style="padding: 12px 10px !important;"><i class="material-icons">menu</i></div>
    </div>

    <div class="w3-container" style="margin-top:50px">

    <div class="w3-third" style="margin-bottom:32px;">
        <div class="w3-card w3-container w3-bar-item" style="box-shadow:0 !important">
            <img src="devs/biza.png" class="onas" alt="Alps">
            <div class="w3-container w3-center">
                <p>Matěj Bíža</p>
                <p>bizama18@sps-prosek.cz</p>
                <p><strong>CEO a hlava celého projektu, kóder</strong></p>
            </div>
        </div>
    </div>
    <div class="w3-third" style="margin-bottom:32px;">
        <div class="w3-card w3-container w3-bar-item" style="box-shadow:0 !important">
            <img src="devs/duchoslav.png" class="onas" alt="Alps">
            <div class="w3-container w3-center">
                <p>Marek Duchoslav</p>
                <p>duchoma18@sps-prosek.cz</p>
                <p><strong>Konzultátor, kóder a tvůrce CMS</strong></p>
            </div>
        </div>
    </div>
    <div class="w3-third" style="margin-bottom:32px;">
        <div class="w3-card w3-container w3-bar-item" style="box-shadow:0 !important">
            <img src="devs/cech.jpg" class="onas" alt="Alps">
            <div class="w3-container w3-center">
                <p>Maxim Čech</p>
                <p>cechma18@sps-prosek.cz</p>
                <p><strong>Designer, flákač a tvůrce komunitního přidávání</strong></p>
            </div>
        </div>
    </div>
</div>
<?= renderJsLink(1) ?>
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