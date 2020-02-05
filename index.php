<?php
include "includer.php";

?>
<!DOCTYPE html>
<html lang="cs">

<head>
  <?= renderHead('Jiu-Jitsu slovník', 0) ?>
  <meta name="google-site-verification" content="m1rUnY7VlgeXrxsbPGpSDls9MaNmUMoD3tB0XGii0E0" />
</head>

<body>
  <!-- sidenav - receiver-->
  <div class="w3-bar w3-white">
    <div class="w3-bar-item w3-padding-16">.</div>
  </div>
  <div style="position:fixed; width:100%; z-index:90;top:0" class='z-depth-3'>
    <?= renderSideNav(0) ?>
    <div class="w3-bar w3-gray" id="uppermenu">
      <a href="" class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu</a>
      <!-- searching word without IndexeDB -->

      <div class="w3-bar-item" style="padding-left: 0px; padding:0; width:27%"><input id="nazev2" type="text"
          class="input_css"><img src="images/icons/clear-24px.svg" alt="clear" height="18" id="clear-input"></img></div>
      <!-- Czech/Japanese search -->
      <div id="japan_czech" class="w3-bar-item w3-button w3-padding-16">JP</div>
      <!--filter - caller-->
      <button id="filter_button" onclick="myFunction('Demo1')" class="w3-button w3-padding-16 w-bar-item"
        style="padding-right: 10px;padding-left: 10px;"><img src="images/icons/filter.svg" alt="filter"
          id="filter_penis"></button>
      <!-- sidenav - caller-->
      <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()"
        style="padding: 12px 10px !important;"><i class="material-icons">menu</i></div>
    </div>
    <!--filter - receiver-->
    <!-- choosing what tequiniequs you want to see with collapsible-->
    <div id="Demo1" class="w3-container w3-hide" style="background-color:#F5F5F5; padding-bottom:16px;">
      <!-- checking if you want to see words or tequineques -->
      <p>
        <label class="container" style="margin-top:12px">Slovicka
          <input type="checkbox" checked="checked" class="TechniquesWordsOnClick filter_box"
            id="TechniquesWordsOnClickSlovicka" />
          <span class="checkmark"></span>
        </label>
      </p>
      <p>
        <label class="container">Techniky
          <input type="checkbox" checked="checked" class="TechniquesWordsOnClick filter_box"
            id="TechniquesWordsOnClickTechniky" />
          <span class="checkmark"></span>
        </label>
      </p>
      <hr style="border-color:rgb(200, 200, 200)">
      Typy technik:
      <div class="w3-row">
        <button id="filter_button1" onclick="myFunction('Demo2')" class="w3-button w3-col w3-rest w3-gray"> <i
            class="material-icons">arrow_drop_down</i></i></button>
      </div>
      <div id="Demo2" class="w3-padding-16 w3-hide">
        <div id="techniquesChooser"></div>
      </div>
    </div>
  </div>
  <div class="w3-container w3-border-top">
    <!-- preloader before -->
    <div id="preloaderConterntBefore" class="loadingio-spinner-ellipsis-1h59wc5imqm"
      style="width:100%;margin-bottom:200px">
      <div class="ldio-zcxwoytn0h" style="width:220px; margin:auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <!-- search result -->
    <div id="searchResult"></div>
    <!-- preloader after -->
    <div id="preloaderConterntAfter" class="loadingio-spinner-ellipsis-1h59wc5imqm" style="width:100%;margin-top:200px">
      <div class="ldio-zcxwoytn0h" style="width:220px; margin:auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>


    <!-- box for long hold -->
    <div id="longHoldBox" class='z-depth-3'>
      <div class="w3-panel" style="margin:0">
        <p style="font-size:80%">Nova slovíčka se nenačítají při scrollování při přidávání štítků</p>
      </div>
      <div class="w3-bar">
        <!-- for closin and removing class from everything-->
        <a id="closeStitkySelecetor" class="w3-item-bar w3-button right">×</a>
        <p class="w3-bar-item">
          <label class="container">
            <input type="checkbox" id="selectAllDiselectAllControllerSTITKY" class="filter_box" />
            <span class="checkmark" style="top:7px"></span>
          </label>
        </p>
        <a class="waves-effect waves-light w3-button modal-trigger" href="#modal1" id="StitkyModalOpener">Změnit
          štítky</a>
      </div>
    </div>
    <!-- modal for adding labels -->
    <div id="modal1" class="modal">
      <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
      <div class="modal-content" id="LabelAdd">
      </div>
      <div class="modal-footer" id="LabelAddFooter">
      </div>
    </div>
  </div>

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
  <?= renderJsLink(0) ?>
</body>

</html>