<?php
    include "../includer.php";
?>
<!DOCTYPE html>
<html lang="cs">
    <head>       
        <!-- TODO Add name of website (meta tags) based on what he searched -->
        <?=renderHead('Jiu-Jitsu slovník', 1)?>
    </head>
    <body>
  <?= renderSideNav(1) ?>
  <div class="w3-bar w3-gray">
    <a href=".." class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu slovník</a>
	  <a href=".." class="w3-bar-item w3-padding-16 w3-button" style="height:54px;"><i class="material-icons">keyboard_return</i></a>
     <!-- sidenav - caller-->
    <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()" style="padding: 12px 10px !important;"><i class='material-icons'>menu</i></div>
  </div>
  <div class="w3-container">
    <div id="wordOutput"></div>
  </div>

    
 
 
    <?=renderJSSubLinks(1, 'callerSearchedWord.js')?>    
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