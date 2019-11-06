<?php
    include "includer.php";

?>
<!DOCTYPE html>
<html lang="cs">
    <head>       
        <?=renderHead('Jiu-Jitsu Slovník', 0)?>
    </head>
    <body>
    <!-- searching word -->
    <div class="row">
        <form class="col s12">
        <div class="row">
            <div class="input-field col s12">
            <input id="nazev" type="text" class="validate">
            <label for="nazev">Název</label>
            </div>
        </div>         
        </form>
    </div>
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
 
  
 
    <?=renderJsLink(0)?>        
    </body>
</html>