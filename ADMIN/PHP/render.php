<?php // zobrazovani obsahu
    function search_result_render($data, $language) { // zobrazi vyskedky vyhledavani || Duchoslav
        $returner = '';
        if($language == 'japanese') {
            foreach ($data as $key) {
                $returner .= '<h4>'.$key['japanese'].'</h4><h5>'.$key['czech'].'</h5><a class="waves-effect waves-light btn modal-trigger odkaz" href="#modal1" data-id="'.$key['ID'].'">upravit</a><a class="waves-effect waves-light btn modal-trigger delete" href="#modal5" data-id="'.$key['ID'].'">smazat</a><br><br>';
            }
        } else {
            foreach ($data as $key) {
                $returner .= '<h4>'.$key['czech'].'</h4><h5>'.$key['japanese'].'</h5><a class="waves-effect waves-light btn modal-trigger odkaz" href="#modal1" data-id="'.$key['ID'].'">upravit</a><a class="waves-effect waves-light btn modal-trigger delete" href="#modal5" data-id="'.$key['ID'].'">smazat</a><br><br>';
            }
        }
        
        return $returner;
    }

    /*
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
    */
    function popup_result($data) { // zobrazi vysledek v popup okne || Duchoslav
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
    function popup_result_technique($data, $data1, $data2) { // zobrazi vysledek v popup okne pro upravu technik || Duchoslav
        $returner = '';
        foreach ($data as $key) {
            $returner .= "<form action='nvm.php' method='POST' id='formular'>";
            $returner .= "<input type='text' name='japanese' id='japanese' value='".$key['japanese']."'>";
            $returner .= "<input type='text' name='czech' id='czech' value='".$key['czech']."'>";
            //$returner .= "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
        }
        foreach ($data1 as $key) {
            $returner .= "<textarea name='description' placeholder='Desription' id='description'>".$key['content']."</textarea>";
            $returner .= "<img src='../../img/".$key['imageUrl']."' alt='".$key['content']."' height='42'>";
            $returner .= "<input type='file' name='picture' id='image'>";
            $returner .= "<a href='' id='delete_image'>smazat obrázek</a>";
        }
        $returner .= "<select class='select-techniques' style='display: block;'>";
        foreach ($data2 as $key) {
            $returner .= "<option value='".$key['value']."'>".$key['value']."</option>";
        }
        $returner .= "</select>";
        $returner .= "<input type='submit' name='submit' id='submit-update'>";
        $returner .= "</form>";
        $returner .= "<button id='delete'>Delete</button>";
        return $returner;
    }
    function types_result($data) { // zobrazi typy v popup okne || Duchoslav
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
    function techniques_result($data) { // zobrazi typy v popup okne || Duchoslav
        $returner = '';
        foreach ($data as $key) {
            $returner .= "<option value='".$key['value']."'>".$key['value']."</option>";
        }
        return $returner;
    }
    function users_result($data) { // zobrazi uzivatele || Duchoslav
        $returner = '';
        foreach ($data as $key) {
            $returner .= "<div>";
            $returner .= "<h5>".$key['email']."</h5>";
            $returner .= "<h6>".$key['name']."</h6>";
            $returner .= "<button id='admin_user' data-id='".$key['ID']."' class='admin_user'>Admin</button>";          
            $returner .= "<button id='delete_user' data-id='".$key['ID']."' class='delete_user'>Delete</button>";
            $returner .= "</div>";
            $returner .= "<br>";
            $returner .= "<br>";
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
        $render .= '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
        $render .= '<link rel="stylesheet" href="/slovnik/admin/CSS/style.css">';   
        $render .= '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
        $render .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
        $render .= '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
        return $render;    
	}
	function renderJsLink($dots, $callerName) { // for rendering JS links || BIZA    
        $dotas = "../"; // add dots to choose folder automaticly
        $dotingSystem = "";        
        for ($i=0; $i < $dots; $i++) {
            $dotingSystem .= $dotas;
        }
        $render = '';        
        $render .= '<script src="'.$dotingSystem.'JS/render.js"></script>';
        //$render .= '<script src="'.$dotingSystem.'JS/functions.js"></script>';
        if ($callerName != "") {
            $render .= '<script src="'.$dotingSystem.'JS/'.$callerName.'"></script>';
        }     
        $render .= '<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>';
        return $render;    
    }   
    function techniques_vyber_result($data) { // zobrazi typy pro vyber co chce user zobrazit || BIZA
        $returner = '';
        $returner .= '<p>';
        $returner .= '<label>';
        $returner .= '<input type="checkbox" checked="checked" id="selectAllDiselectAllController" class="TechniquesWordsOnClick" />';
        $returner .= '<span>Vybrat vše</span>'; 
        $returner .= '</label>';
        $returner .= '</p>';
        foreach ($data as $key) {
            $returner .= '<p>';
            $returner .= '<label>';
            $returner .= '<input type="checkbox" checked="checked" class="selectAllDiselectAll TechniquesWordsOnClick" data-searchvalue="'.$key['value'].'"/>';
            $returner .= '<span>'.$key['value'].'</span>'; 
            $returner .= '</label>';
            $returner .= '</p>';    
        }
        return $returner;
    }
// renderuje pagination || BIZA
function render_pagination($count) {
    $count = ceil($count);
    $returner = '<a href="#" id="move_left" data-count="'.$count.'">&laquo;</a>';
    $returner .= '<a class="pagination_page active pageba1" data-id="1">1</a>';
    for ($i=2; $i <= $count; $i++) { 
        $returner .= '<a class="pagination_page pageba'.$i.'" data-id="'.$i.'">'.$i.'</a>';
    }
    $returner .= '<a href="#" id="move_right" data-count="'.$count.'">&raquo;</a>';
    return $returner;
}