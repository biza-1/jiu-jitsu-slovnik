<?php // zobrazovani obsahu
function search_result_render($data, $language)
{ // zobrazi vyskedky vyhledavani || Duchoslav
    $returner = '';
    if ($language == 'japanese') {
        foreach ($data as $key) {
            $returner .= '<div class="w3-bar w3-white w3-border-bottom"><div class="w3-bar w3-white"><div class="w3-bar-item" style="padding:0"><h3 style="heighh:30px"><strong>' . $key['japanese'] . '</strong></h3></div><br><div class="w3-bar"><div style="margin-left:60px"><h3 style="margin:0; height:30px">' . $key['czech'] . '</h3></div></div></div><div class="w3-bar w3-white"><div class="w3-bar-item"><a class="waves-effect waves-light modal-trigger odkaz w3-button" href="#modal1" data-id="' . $key['ID'] . '"><i class="material-icons icons-button">edit</i>UPRAVIT</a></div><div class="w3-bar-item"><a class="waves-effect waves-light modal-trigger delete w3-button" href="#modal5" data-id="' . $key['ID'] . '"><i class="material-icons icons-button">delete</i>SMAZAT</a></div></div></div>';
        }
    } else {
        foreach ($data as $key) {
            $returner .= '<div class="w3-bar w3-white w3-border-bottom"><div class="w3-bar w3-white"><div class="w3-bar-item" style="padding:0"><h3 style="height:30px"><strong>' . $key['czech'] . '</strong></h3></div><br><div class="w3-bar"><div style="margin-left:60px"><h3 style="margin:0; height:30px">' . $key['japanese'] . '</h3></div></div></div><div class="w3-bar w3-white"><div class="w3-bar-item"><a class="waves-effect waves-light modal-trigger odkaz w3-button" href="#modal1" data-id="' . $key['ID'] . '"><i class="material-icons icons-button">edit</i>UPRAVIT</a></div><div class="w3-bar-item"><a class="waves-effect waves-light modal-trigger delete w3-button" href="#modal5" data-id="' . $key['ID'] . '"><i class="material-icons icons-button">delete</i>SMAZAT</a></div></div></div>';
        }
    }

    return $returner;
}
function popup_result($data)
{ // zobrazi vysledek v popup okne || Duchoslav
    $returner = '';
    foreach ($data as $key) {
        $returner .= "<form action='nvm.php' method='POST' id='formular'>";
        $returner .= "<label>Japonsky:</label>";
        $returner .= "<input type='text' class='input_css' name='japanese' id='japanese' value='" . $key['japanese'] . "'>";
        $returner .= "<label>Česky:</label>";
        $returner .= "<input type='text' class='input_css' name='czech' id='czech' value='" . $key['czech'] . "'>";
        $returner .= "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
        $returner .= "<input type='submit' name='submit' id='submit'>";
        $returner .= "</form>";
        $returner .= "<button id='delete'>Delete</button>";
    }
    return $returner;
}
function popup_result_technique($data, $data1, $data2)
{ // zobrazi vysledek v popup okne pro upravu technik || Duchoslav
    $returner = '';
    foreach ($data as $key) {
        $returner .= "<form action='nvm.php' method='POST' id='formular'>";
        $returner .= "<label>Japonsky:</label>";
        $returner .= "<input type='text' class='input_css' name='japanese' id='japanese' value='" . $key['japanese'] . "'>";
        $returner .= "<label>Česky:</label>";
        $returner .= "<input type='text' class='input_css' name='czech' id='czech' value='" . $key['czech'] . "'>";
        //$returner .= "<select name='type' id='type'><option value='slovo'>Slovo</option><option value='slovo2'>Slovo2</option></select>";
    }
    foreach ($data1 as $key) {
        $returner .= "<textarea name='description' placeholder='Desription' id='description'>" . $textarea . "</textarea>";
        $returner .= "<img src='../../img/" . $key['imageUrl'] . "' alt='" . $key['content'] . "' height='42'>";
        $returner .= "<input type='file' name='picture' id='image'>";
        $returner .= "<a href='' id='delete_image' style='font-size:16px'><i class='material-icons icons-button'>delete</i>smazat obrázek</a>";
    }
    $returner .= "<select class='select-techniques' style='display: block;'>";
    foreach ($data2 as $key) {
        $returner .= "<option value='" . $key['value'] . "'>" . $key['value'] . "</option>";
    }
    $returner .= "</select>";
    $returner .= "<input type='submit' name='submit' id='submit-update'>";
    $returner .= "</form>";
    $returner .= "<button id='delete'>Delete</button>";
    return $returner;
}
function types_result($data)
{ // zobrazi typy v popup okne || Duchoslav
    $returner = '';
    foreach ($data as $key) {
        $returner .= "<div class='w3-bar'><form method='POST' class='edit_type'>";
        $returner .= "<div class='w3-bar'><input type='text' name='type-edit' class='type-edit-" . $key['ID'] . " input_css w3-border' value='" . $key['value'] . "' style='width:70%'></div>";
        // idcka id='type-edit' id='delete_type' 
        //$returner .= "<input type='submit' name='submit' id='submit' data-id='".$key['ID']."'>";
        $returner .= "<div class='w3-bar' style='margin-top:16px;'><button type='submit' style='padding: 8px 13px!important;' class='submit-edit w3-bar-item w3-button' data-id='" . $key['ID'] . "' value='Submit'><i class='material-icons icons-button'>send</i>Upravit</button>";
        $returner .= "</form>";
        $returner .= "<button data-id='" . $key['ID'] . "' class='delete_type w3-bar-item w3-button' style='height:40px;padding: 8px 13px!important;'><i class='material-icons icons-button'>delete</i>Smazat</button></div></div><hr>";
    }
    return $returner;
}
function techniques_result($data)
{ // zobrazi typy v popup okne || Duchoslav
    $returner = '';
    foreach ($data as $key) {
        $returner .= "<option value='" . $key['value'] . "'>" . $key['value'] . "</option>";
    }
    return $returner;
}
function users_result($data, $data2)
{ // zobrazi uzivatele || Duchoslav
    $returner = '';
    $oneDimensionalArray = array_map('current', $data2);
    foreach ($data as $key) {
        $checkbox = "<input id='admin_user' data-id='" . $key['ID'] . "' class='admin_user filter_box' type='checkbox'>";
        if (in_array($key['ID'], $oneDimensionalArray)) {
            $checkbox = "<input type='checkbox' checked id='admin_user' data-id='" . $key['ID'] . "' class='admin_user inputfile filter_box'>";
        } else {
            $checkbox = "<input type='checkbox' id='admin_user' data-id='" . $key['ID'] . "' class='admin_user inputfile filter_box'>";
        }
        $returner .= "<div class='w3-bar w3-border-bottom'><div class='w3-bar'>";
        $returner .= "<div class='w3-bar-item'>" . $key['name'] . " " . $key['surname'] . "</div>";
        $returner .= "</div>";
        $returner .= "<div class='w3-bar'>";
        $returner .= "<div class='w3-bar-item margin-left-large'>" . $key['email'] . "</div></div>";
        $returner .= "<hr>";
        $returner .= "<div class='w3-bar'>";
        //$returner .= "<button id='admin_user' data-id='".$key['ID']."' class='admin_user'>Admin</button>";      
        $returner .= "<div class='w3-bar-item'><label class='container'>ADMIN";
        $returner .= $checkbox;
        $returner .= "<span class='checkmark'></span></label></div>";
        $returner .= "<button style='margin-left:20px' id='delete_user' data-id='" . $key['ID'] . "' class='delete_user w3-bar-item w3-button'>Delete</button>";
        $returner .= "</div></div>";
    }
    return $returner;
}
function renderHead($title, $dots)
{ // for rendering head content || BIZA
    $dotas = "../"; // add dots to choose folder automaticly
    $dotingSystem = "";
    for ($i = 0; $i < $dots; $i++) {
        $dotingSystem .= $dotas;
    }
    $render = '';
    $render .= '<meta charset="UTF-8">';
    $render .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    $render .= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
    $render .= '<title>' . $title . '</title><meta name="title" content="Jiu Jitsu">
        <meta name="description" content="Jiu-Jitsu slovník">
        <meta name="keywords" content="Slovnik, Jiu jitsu admin, JiuJitsu, Jiu-jitsu, Admin, Matej biza, Matej, Biza, Matěj Bíža">
        <meta name="robots" content="index, follow">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="language" content="English">
        ';
    $render .= '<meta name="google-signin-client_id" content="636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com">';
    //css na inputy
    //$render .= '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">';
    //css na inputy
    $render .= '<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">';
    $render .= '<link rel="shortcut icon" href="' . $dotingSystem . 'images/icons/favicon.ico" type="image/x-icon">';
    $render .= '<link rel="icon" href="' . $dotingSystem . 'images/icons/favicon.ico" type="image/x-icon">';
    $render .= '<script src="/slovnik/includeTECHNILOGIES/jquerytechnolgy.js"></script>';
    $render .= '<link rel="stylesheet" href="' . $dotingSystem . 'CSS/style.css">';
    $render .= '<script src="/slovnik/includeTECHNILOGIES/materializejs.js"></script>';
    $render .= '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
    $render .= '<script src="https://kit.fontawesome.com/5d77a8d235.js" crossorigin="anonymous"></script>';
    $render .= '<link href="https://fonts.googleapis.com/css?family=Quicksand:400,600,700&display=swap" rel="stylesheet">';

    return $render;
}
function renderJsLink($dots, $callerName)
{ // for rendering JS links || BIZA    
    $dotas = "../"; // add dots to choose folder automaticly
    $dotingSystem = "";
    for ($i = 0; $i < $dots; $i++) {
        $dotingSystem .= $dotas;
    }
    $render = '';
    $render .= '<script src="' . $dotingSystem . 'JS/render.js"></script>';

    //$render .= '<script src="'.$dotingSystem.'JS/functions.js"></script>';
    if ($callerName != "") {
        $render .= '<script src="' . $dotingSystem . 'JS/' . $callerName . '"></script>';
    }
    $render .= '<script src="' . $dotingSystem . 'JS/functions.js"></script>';
    $render .= '<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>';
    return $render;
}
function techniques_vyber_result($data)
{ // zobrazi typy pro vyber co chce user zobrazit || BIZA
    $returner = '';
    $returner .= '<p>';
    $returner .= '<label class="container">Vybrat vše';
    $returner .= '<input type="checkbox" checked="checked" id="selectAllDiselectAllController" class="TechniquesWordsOnClick" />';
    $returner .= '<span class="checkmark"></span>';
    $returner .= '</label>';
    $returner .= '</p>';
    foreach ($data as $key) {
        $returner .= '<p>';
        $returner .= '<label class="container">' . $key['value'] . '';
        $returner .= '<input type="checkbox" checked="checked" class="selectAllDiselectAll TechniquesWordsOnClick" data-searchvalue="' . $key['value'] . '"/>';
        $returner .= '<span class="checkmark"></span>';
        $returner .= '</label>';
        $returner .= '</p>';
    }
    return $returner;
}
// renderuje pagination || BIZA
function render_pagination($count)
{
    $count = ceil($count);
    $returner = '<a href="#" id="move_left" data-count="' . $count . '">&laquo;</a>';

    $returner .= '<a class="pagination_page active pageba1" data-id="1">1</a>';
    $returner .= '<a class="morePages">...</a>';
    for ($i = 2; $i < $count; $i++) {
        $returner .= '<a class="pagination_page pageba' . $i . '" data-id="' . $i . '">' . $i . '</a>';
    }
    $returner .= '<a class="morePages2">...</a>';
    if ($count > 2) {
        $returner .= '<a class="pagination_page pageba' . $count . '" data-id="' . $count . '">' . $count . '</a>';
    }

    $returner .= '<a href="#" id="move_right" data-count="' . $count . '">&raquo;</a>';
    return $returner;
}