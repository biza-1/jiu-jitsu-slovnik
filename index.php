<?php
    include "includer.php";

?>
<!DOCTYPE html>
<html lang="cs">
    <head>       
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
        
 
 
 
    <?=renderJsLink()?>        
    </body>
</html>