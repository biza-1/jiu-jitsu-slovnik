<?php
include '../../includer.php';
?>
<!DOCTYPE html>
<html lang="cs">

<head>
  <?= renderHead("Vyhledávání", 2) ?>
</head>

<body>
  <!-- scroll top button -->
  <a id="buttonScrollTop"></a>
  <!--sidenav-->
  <div class="w3-sidebar w3-bar-block w3-white w3-animate-right"
    style="display:none;z-index:4; right:0;background-color:#be0029 !important;" id="mySidebar">
    <img class="w3-bar-item" src="<?=$_SESSION['userINFO']['picture']?>" alt="Obrázek uživatele"
      style="width:120px; margin:auto; border-radius:50%;">
    <div class="w3-bar-item" style="padding-bottom:0;color:white"><?=$_SESSION['userINFO']['email']?></div>
    <div class="w3-bar-item" style="padding-top:0;color:white">
      <?= $_SESSION['userINFO']['name']." ".$_SESSION['userINFO']['surname']?></div>
    <li class="divider"></li>
    <a href="#" onclick="signOut();" class="w3-bar-item w3-button w3-padding-16">Odhlásit se</a>
    <li class="divider"></li>
    <a href="../sprava_uzivatelu/users.php" class="w3-bar-item w3-button w3-padding-16">Správa uživatelů</a>
    <li class="divider"></li>
  </div>
  <div class="w3-overlay" onclick="w3_close()" style="cursor:pointer" id="myOverlay"></div>

  <div class="w3-bar w3-gray">
    <!--pridavani-->
    <div class="w3-dropdown-hover w3-gray">
      <div class="w3-bar-item w3-button w3-padding-16"
        style="padding-bottom: 14px !important; padding-left: 14px !important;padding-right: 14px !important;"><i
          class="material-icons">add</i>
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
          <a class="waves-effect waves-light   modal-trigger techniques" href="#modal4">
            <div class="w3-bar-item w3-button" style="padding-left: 10px !important;">Přidávání technik</div>
          </a>
          <a class="waves-effect waves-light   modal-trigger types" href="#modal3">
            <div class="w3-bar-item w3-button" style="padding-left: 10px !important;">Přidávání typů</div>
          </a>
          <a class="waves-effect waves-light   modal-trigger slovicka" href="#modal2">
            <div class="w3-bar-item w3-button" style="padding-left: 10px !important;">Přidávání slovíčka</div>
          </a>
        </div>
      </div>
    </div>
    <!--input na vyhledavani-->
    <div class="w3-bar-item" id="searchDIV">
      <input type="search" name="search" id="search" style="color:black;" maxlength="255"><img
        src="../../../images/icons/clear-24px.svg" alt="clear" height="18" id="clear-input"></img>
    </div>
    <!--zmena jazyka-->
    <a id="japan_czech" class="w3-bar-item w3-button w3-padding-16"
      style="padding-right:16px !important;padding-left:16px !important;">JP</a>
    <!--Filter-->
    <button id="filter_button" onclick="myFunction('Demo1')" class="w3-button w3-bar-item w3-padding-16" style=""><i
        class="fas fa-filter"></i></button>
    <!--odhlaseni-->
    <button class="w3-button w3-gray w3-padding-16 w3-right" onclick="w3_open()">☰</button>
  </div>

  <!-- choosing what tequiniequs you want to see with collapsible-->
  <div id="Demo1" class="w3-container w3-hide" style="background-color:#F5F5F5">
    <!-- checking if you want to see words or tequineques -->
    <p>
      <label class="container" style="margin-top:12px">Slovicka
        <input type="checkbox" checked="checked" class="TechniquesWordsOnClick inputfile filter_box"
          id="TechniquesWordsOnClickSlovicka" />
        <span class="checkmark"></span>
      </label>
    </p>
    <p>
      <label class="container">Techniky
        <input type="checkbox" checked="checked" class="TechniquesWordsOnClick" id="TechniquesWordsOnClickTechniky" />
        <span class="checkmark"></span>
      </label>
    </p>
    <hr>
    Typy technik:
    <div class="w3-row">
      <button id="filter_button1" onclick="myFunction('Demo2')" class="w3-button w3-col w3-rest"><i
          class="fas fa-caret-down"></i></i></button>
    </div>
    <div id="Demo2" class="w3-padding-16 w3-hide">
      <div id="techniquesChooser"></div>
    </div>
  </div>

  <div class="pagination"></div>
  <div class="w3-container">
    <div id="here"></div>
  </div>

  <div class="pagination"></div>
  <!-- Editace slovicka/techniky -->
  <div id="modal1" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
    <div class="modal-content">
      <div class="w3-bar">
        <h2 class="w3-bar-item">Úprava slovíček</h2>
      </div>
      <li class="divider" style="border-color:#be0029;margin-bottom:16px !important"></li>
      <div class="edit-slova"></div>
    </div>
  </div>
  <!-- Pridavani slovicka -->
  <div id="modal2" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
    <div class="modal-content">
      <div class="w3-bar">
        <h2 class="w3-bar-item">Přidávání slovíček</h2>
      </div>
      <li class="divider" style="border-color:#be0029;margin-bottom:16px"></li>
      <div class="w3-bar">
        <form id="add_new_word">
          <div class="w3-bar">
            <label>Japonsky:</label>
            <div class="w3-bar"></div>
            <input type="text" name="japanese" id="japanese" class="input_css" maxlength="255">
          </div>
          <div class="w3-bar" style="margin-top:16px;">
            <label>Česky:</label>
            <div class="w3-bar"></div>
            <input type="text" name="czech" id="czech" class="input_css" maxlength="255">
          </div>
          <div class="w3-bar" style="margin-top:16px;">
            <div id="descriptionBar1">
              <label>Popis:</label>
              <textarea id="description1"></textarea>
            </div>
          </div>
          <div class="w3-bar-item">
            <!--<button id="edit-pridavani" class="odkaz" style="display: none;">Slovíčko už existuje, můžete ho upravit</button>-->
            <a class="modal-trigger zkouska odkaz" id="edit-pridavani" href="#modal1" data-id=""
              style="display: none;">Slovíčko už existuje, můžete ho upravit</a>
          </div>
      </div>
      <div class="w3-bar">
        <label for="add-continue" class="w3-button w3-item-bar" style="margin:16px; margin-left:0px"><i
            class="material-icons icons-button">send</i>Přidat a pokračovat v přidávání</label>
        <input type="submit" name="submit" id="add-continue" class="inputfile-1 inputfile">
        </form>
        <button id="add-close" class="w3-bar-item w3-button"
          style="margin:16px; margin-left:0px;padding: 8px 13px!important;"><i
            class="material-icons icons-button">subdirectory_arrow_right</i>Přidat a zavřít</button>
      </div>
    </div>
  </div>

  <!-- Editace typů -->
  <div id="modal3" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
    <div class="modal-content edit-typu">
      <div class="w3-bar">
        <h2 class="w3-bar-item">Přidávání a editace typů</h2>
      </div>
      <li class="divider" style="border-color:#be0029;margin-bottom:16px"></li>
      <form id="add_new_type">
        <div class="w3-bar">
          <label>Název nového typu:</label>
        </div>
        <div class="w3-bar">
          <div class="w3-bar-item">
            <input type="text" name="type" id="type" class="input_css" placeholder="Lorem ipsum..." maxlength="255">
          </div>
          <div class="w3-bar-item">
            <label for="Pridat" class="w3-button w3-item-bar"><i
                class="material-icons icons-button">add</i>Přidat</label>
            <input type="submit" name="submit" value="Přídat" class="inputfile-1 inputfile" id="Pridat">
          </div>
        </div>
      </form>

      <li class="divider" style="border-color:#be0029;margin-top:16px;"></li>
      <div class="w3-bar">
        <div class="w3-bar-item">Typy:</div>
      </div>
      <div id="types-view"></div>
    </div>
  </div>
  <!-- Pridavani technik -->
  <div id="modal4" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
    <div class="modal-content">
      <div class="w3-bar">
        <h2 class="w3-bar-item">Přidávání technik</h2>
      </div>
      <li class="divider" style="border-color:#be0029;"></li>
      <form id="add_new_technique">
        <div class="w3-bar">
          <div class="w3-bar-item">
            <!--<button id="edit-pridavani" class="odkaz" style="display: none;">Slovíčko už existuje, můžete ho upravit</button>-->
            <a class="waves-effect waves-light   modal-trigger zkouska odkaz" id="edit-pridavani" href="#modal1"
              data-id="" style="display: none;">Slovíčko už existuje, můžete ho upravit</a>
          </div>
          <div class="w3-bar">
            <label>Japonsky:</label>
          </div>
          <div class="w3-bar">
            <input type="text" name="japanese" id="japanese-technique" class="input_css" maxlength="255">
          </div>
          <div class="w3-bar" style="margin-top:16px;">
            <label>Česky:</label>
          </div>
          <div class="w3-bar">
            <input type="text" name="czech" id="czech-technique" class="input_css" maxlength="255">
          </div>
        </div>
        <div class="w3-bar" style="margin-top:16px;">
          <label>Vyberte typ:</label>
          <select class="select-technique" style="display:block">
            <option value="">Vyberte typ</option>
          </select>
        </div>
        <div class="w3-bar" style="margin-top:16px;">
          <div id="descriptionBar">
            <label>Popis:</label>
            <textarea id="description"></textarea>
          </div>
        </div>
        <div class="w3-bar">
          <div class="w3-bar-item">
            <img src='../../img/neni.jpg' alt='neni tu obrazek' height='140px' id='image_nahled'>
            <input type="file" name="picture" id="image" class="inputfile-1 inputfile">
            <label for="image"><i class="material-icons icons-button">add_a_photo</i>Vyberte obrázek</label>
          </div>
        </div>
        <div class="w3-bar">
          <div class="w3-bar-item">
            <label for="add-close-technique" class="w3-button"><i
                class="material-icons icons-button">subdirectory_arrow_right</i>Přidat a zavřít</label>
            <input id="add-close-technique" class="inputfile-1 inputfile" type="submit" name="submit" value="">
            <!--<button id="add-close-technique">Přidat a zavřít</button>-->
          </div>
          <div class="w3-bar-item">
            <label for="add-continue-technique" class="w3-button"><i class="material-icons icons-button">send</i>Přidat
              a pokračovat v přidávání</label>
            <input id="add-continue-technique" class="inputfile-1 inputfile" type="submit" name="submit" value="">
          </div>
        </div>
      </form>
    </div>
  </div>
  <div id="modal5" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
    <div class="modal-content delete-alert">
      <h3>Opravdu chcete smazat?</h3>
      <button class="delete-word w3-button">Ano</button>
      <button class="modal-close w3-button">Ne</button>
    </div>
    <div class="modal-footer" style="height:30px">
    </div>
  </div>

  <?= basic_modal() ?>
  <?= renderJsLink(2, "search.js") ?>
  <script>
    function myFunction(id) {
      var x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }

    function w3_open() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    }
  </script>
</body>

</html>