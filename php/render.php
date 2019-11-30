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
        $render .= '<meta name="google-signin-client_id" content="599594684179-ibspimqbhr7he9q0nc2gclmof27ehk2i.apps.googleusercontent.com">';
        $render .= '<title>'.$title.'</title>';
        $render .= '<link rel="shortcut icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="manifest" href="'.$dotingSystem.'manifest.json">';
        $render .= '<link rel="stylesheet" type="text/css" href="'.$dotingSystem.'css/style.css">';
        $render .= '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';       
        $render .= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        $render .= '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
        $render .= '<script src="https://apis.google.com/js/platform.js" async defer></script>';
        $render .= '<script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>'; // less Violations > better performance
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>'; // for some __ operations
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
    function renderJSSubLinks($dots, $nameOfJSCaller) { // for rendering JS links outside index.php (doesnt load SW) || BIZA    
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
        $render .= '<script src="'.$dotingSystem.'js/'.$nameOfJSCaller.'"></script>';   
        return $render;    
    }    
    function renderSideNav($dots) {
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';
        //$render .= '<nav> <!-- navbar content here  --> </nav>';
        $render .= '
        
      
        <ul id="slide-out" class="sidenav">
          <li>
            <div class="user-view showUser">            
            <div id="profileinfo"></div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <div class="showUserLogOff">            
            
            </div>
          </li>          
          <li><a href="'.$dotingSystem.'pages/stitky.php">Štítky</a></li>
          <li><div class="divider"></div></li>
          
          <li><a class="waves-effect" href="#!">O nás</a></li>
        </ul>
        <a href="#!" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
        return $render;    
    }
