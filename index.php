<?php
include "includer.php";

?>
<!DOCTYPE html>
<html lang="cs">

<head>
  <?= renderHead('Jiu-Jitsu Slovník', 0) ?>
</head>

<body>
  <!-- searching word without IndexeDB -->
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="nazev2" type="text" class="validate">
          <label for="nazev2">Název</label>
        </div>
      </div>
    </form>
  </div>
  <!-- side nav-->
  <?=renderSideNav(0)?>
  <!-- Czech/Japanese search -->
  <a class="waves-effect waves-light btn" id="japan_czech">CZ</a>
  <!-- checking if you want to see words or tequineques -->
  <p>
    <label>
      <input type="checkbox" checked="checked" class="TechniquesWordsOnClick" id="TechniquesWordsOnClickSlovicka" />
      <span>Slovicka</span>
    </label>
  </p>
  <p>
    <label>
      <input type="checkbox" checked="checked" class="TechniquesWordsOnClick" id="TechniquesWordsOnClickTechniky" />
      <span>techniky</span>
    </label>
  </p>
  <!-- choosing what tequiniequs you want to see with collapsible-->
  <ul class="collapsible" id="collapsibleTequniques">
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>Techniky</div>
      <div class="collapsible-body" id="collapsibleTequniques">
        <span>
          <div id="techniquesChooser"></div>
        </span>
      </div>
    </li>
  </ul>
  
  <div id="searchResult"></div>
  


  <!-- box for long hold -->
  <div id="longHoldBox">
    <!-- for closin and removing class from everything-->
    <a class="btn-floating btn-small waves-effect waves-light red" id="closeStitkySelecetor"><i class="material-icons">cancel</i></a>
    <p>
      <label>
        <input type="checkbox" id="selectAllDiselectAllControllerSTITKY" />
        <span>Vybrat vše</span>
      </label>
    </p>
    <a class="waves-effect waves-light btn modal-trigger right" href="#modal1" id="StitkyModalOpener">Změnit štítky</a>
  </div>
  <!-- modal for adding labels -->
  <div id="modal1" class="modal">
    <div class="modal-content" id="LabelAdd"> 
    </div>
    <div class="modal-footer" id="LabelAddFooter">        
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
    </div>
  </div>
  <?= renderJsLink(0) ?>
</body>

</html>