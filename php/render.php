<?php
    function renderHead($title) // for rendering head content || BIZA
    {
        $render = '';
        $render .= '<meta charset="UTF-8">';
        $render .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        $render .= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
        $render .= '<title>'.$title.'</title>';
        $render .= '<link rel="shortcut icon" href="images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="icon" href="images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="manifest" href="manifest.json">';
        $render .= '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        $render .= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
        $render .= '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
        return $render;    
    }
    function renderJsLink() // for rendering JS links || BIZA
    {
        $render = '';
        $render .= '<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>';
        $render .= '<script src="js/app.js"></script>';     
        $render .= '<script src="js/db.js"></script>';
        $render .= '<script src="js/dbFunctions.js"></script>';   
        $render .= '<script src="js/functions.js"></script>'; 
        $render .= '<script src="js/render.js"></script>'; 
        $render .= '<script src="js/caller.js"></script>'; 
        return $render;    
    }

?>