<?php
    include "../includer.php";
?>
<!DOCTYPE html>
<html lang="cs">
    <head>       
        <!-- TODO Add name of website (meta tags) based on what he searched -->
        <?=renderHead('Slovnik', 1)?>
    </head>
    <body>
        <div id="wordOutput"></div>
        

    
 
 
    <?=renderJSSubLinks(1, 'callerSearchedWord.js')?>        
    </body>
</html>