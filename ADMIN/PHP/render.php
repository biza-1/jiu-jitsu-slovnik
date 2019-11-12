<?php // zobrazovani obsahu
    function search_result_render($data, $language) { // zobrazi vyskedky vyhledavani || Duchoslav
        $returner = '';
        if($language == 'japanese') {
            foreach ($data as $key) {
                $returner .= '<a class="waves-effect waves-light btn modal-trigger odkaz" href="#modal1" data-id="'.$key['ID'].'">'.$key['japanese'].'</a><br><span>'.$key['czech'].'</span><br><br>';
            }
        } else {
            foreach ($data as $key) {
                $returner .= '<a class="waves-effect waves-light btn modal-trigger odkaz" href="#modal1" data-id="'.$key['ID'].'">'.$key['czech'].'</a><br><span>'.$key['japanese'].'</span><br><br>';
            }
        }
        
        return $returner;
	}
    function popup_result($data) { // zobrazi vysledek v popup okne
        $returner = '';
        foreach ($data as $key) {
            $returner .= "<form action='nvm.php' method='POST' id='formular'>";
            $returner .= "<input type='text' name='japanese' id='japanese' value='".$key['japanese']."'>";
            $returner .= "<input type='text' name='czech' id='czech' value='".$key['czech']."'>";
            $returner .= "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
            $returner .= "<input type='submit' name='submit' id='submit'>";
            $returner .= "</form>";
            $returner .= "<button id='delete'>Delete</button>";
        }
        return $returner;
    }
    function types_result($data) { // zobrazi typy v popup okne
        $returner = '';
        foreach ($data as $key) {
            $returner .= "<br>";
            $returner .= "<form method='POST' class='edit_type'>";
            $returner .= "<input type='text' name='type-edit' id='type-edit' class='type-edit-".$key['ID']."' value='".$key['value']."'>";
            //$returner .= "<input type='submit' name='submit' id='submit' data-id='".$key['ID']."'>";
            $returner .= "<button type='submit' class='submit-edit' data-id='".$key['ID']."' value='Submit'>Odeslat</button>";
            $returner .= "</form>";
            $returner .= "<button id='delete_type' data-id='".$key['ID']."' class='delete_type'>Delete</button>";
        }
        return $returner;
    }
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
        $render .= '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        $render .= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
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
        $render .= '<script src="'.$dotingSystem.'JS/render.js"></script>';     
        $render .= '<script src="'.$dotingSystem.'JS/search.js"></script>';
        return $render;    
    }    
?>