<?php
    include "../includer.php";
?>
<!DOCTYPE html>
<html lang="cs">
    <head>       
        <!-- TODO Add name of website based on what he searched -->
        <?=renderHead('Slovnik')?>
    </head>
    <body>
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
       <div id="searchResult"></div>
 
 
 
    <?=renderJsLink()?>        
    </body>
</html>