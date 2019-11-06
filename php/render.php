<?php
    function renderHead($title, $dots) { // for rendering head content || BIZA
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';
        $render .= '<meta charset="UTF-8">';
        $render .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        $render .= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
        $render .= '<title>'.$title.'</title>';
        $render .= '<link rel="shortcut icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="manifest" href="'.$dotingSystem.'manifest.json">';
        $render .= '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';       
        $render .= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        $render .= '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
        return $render;    
    }
    function renderJsLink($dots) { // for rendering JS links || BIZA    
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';
        $render .= '<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>';
        $render .= '<script src="'.$dotingSystem.'js/app.js"></script>';     
        $render .= '<script src="'.$dotingSystem.'js/db.js"></script>';
        $render .= '<script src="'.$dotingSystem.'js/dbFunctions.js"></script>';   
        $render .= '<script src="'.$dotingSystem.'js/functions.js"></script>'; 
        $render .= '<script src="'.$dotingSystem.'js/render.js"></script>'; 
        $render .= '<script src="'.$dotingSystem.'js/caller.js"></script>'; 
        return $render;    
    }    
    function renderJSSubLinks($dots) { // for rendering JS links outside index.php (doesnt load SW or use the same caller) || BIZA    
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';
        $render .= '<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>'; 
        //$render .= '<script src="'.$dotingSystem.'js/app.js"></script>';
        $render .= '<script src="'.$dotingSystem.'js/db.js"></script>';
        $render .= '<script src="'.$dotingSystem.'js/dbFunctions.js"></script>';   
        $render .= '<script src="'.$dotingSystem.'js/functions.js"></script>'; 
        $render .= '<script src="'.$dotingSystem.'js/render.js"></script>';       
        $render .= '<script src="'.$dotingSystem.'js/callerSearchedWord.js"></script>';   
        return $render;    
    }    
?>