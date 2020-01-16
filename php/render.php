<?php
    function renderHead($title, $dots) { // for rendering head content || BIZA
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';
        $render .= '<meta charset="UTF-8">';
        $render .= '<meta name="description" content="Slovník s Jiu-Jitsu slovíčky a technikami.">';
        $render .= '<meta name="keywords" content="Jiu-Jitsu, Jiu, Jitsu, slovník Jiu-Jitsu, slovník, slovník Matěj Bíža, Matěj Bíža, Bíža slovník, Bíža Jiu-Jitsu, Matěj Bíža Jiu-Jitsu, Matěj Bíža slovník, Matěj Bíža jiu jitsu slovník">';
        $render .= '<meta name="robots" content="index, follow">';
        $render .= '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $render .= '<meta name="language" content="Czech">';
        $render .= '<meta name="author" content="Matěj Bíža">';
        $render .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        $render .= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
        $render .= '<meta name="theme-color" content="#be0029"/>';
        $render .= '<link rel="apple-touch-icon" href="/slovnik/images/icons/icon-192x192.png">';
        $render .= '<meta name="google-signin-client_id" content="636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com">';
        $render .= '<title>'.$title.'</title>';
        $render .= '<link rel="shortcut icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="icon" href="'.$dotingSystem.'images/icons/favicon.ico" type="image/x-icon">';
        $render .= '<link rel="manifest" href="'.$dotingSystem.'manifest.json">';
        $render .= '<link rel="stylesheet" type="text/css" href="'.$dotingSystem.'css/style.css">';    
        $render .= '<script src="/slovnik/includeTECHNILOGIES/jquerytechnolgy.js"></script>';
        $render .= '<script src="/slovnik/includeTECHNILOGIES/materializejs.js"></script>';
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
            <div class="w3-sidebar w3-bar-block w3-white w3-animate-right" id="mySidebar">
                <div id="userInfo">
                </div>
                <li class="divider"></li>
                <div class="user-view showUser w3-button w3-bar-item" style="padding:0; width:100%">      
                <div id="profileinfo"></div> 
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
                <li class="divider"></li>
                <div class="showUserLogOff"></div>
                <a href="'.$dotingSystem.'" class="w3-bar-item w3-button w3-padding-16">Slovník</a>
                <li class="divider"></li>
                <a href="'.$dotingSystem.'pages/stitky.php" class="w3-bar-item w3-button w3-padding-16">Štítky</a>
                <li class="divider"></li>
                <a id="updateSlovnik" class="w3-bar-item w3-button w3-padding-16">Aktualizovat slovník</a>
                <li class="divider"></li>
                <a href="'.$dotingSystem.'pages/nas.php" class="w3-bar-item w3-button w3-padding-16">O nás</a>
                <li class="divider"></li>
                <a href="'.$dotingSystem.'/slovnik/admin/" class="w3-bar-item w3-button w3-padding-16">Administrace</a>
                <li class="divider"></li>
                

            </div>
            <div class="w3-overlay" onclick="w3_close()" style="cursor:pointer" id="myOverlay"></div>
        
            '
        ;
        return $render;    
    }
