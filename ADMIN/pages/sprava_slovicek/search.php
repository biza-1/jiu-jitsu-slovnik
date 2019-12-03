<?php
  include '../../includer.php';
?>
<!DOCTYPE html>
<html>
<head>
	<?=renderHead("Vyhledávání", 2)?>
</head>
<body>
  <a class="waves-effect waves-light btn modal-trigger slovicka" href="#modal2">Přidávání slovíčka</a>
  <a class="waves-effect waves-light btn modal-trigger types" href="#modal3">Přidávání typů</a>
  <a class="waves-effect waves-light btn modal-trigger techniques" href="#modal4">Přidávání technik</a>
  <input type="search" name="search" id="search">
  <a class="waves-effect waves-light btn" id="japan_czech">CZ</a><br>
  <!-- checking if you want to see words or tequineques -->
  <p>
    <label>
      <input type="checkbox" checked="checked" class="TechniquesWordsOnClick" id="TechniquesWordsOnClickSlovicka" />
      <span>Slovicka</span>
    </label>
  </p>
  <p>
    <label>
      <input type="checkbox" checked="checked" class="TechniquesWordsOnClick" id="TechniquesWordsOnClickTechniky" />
      <span>techniky</span>
    </label>
  </p>
  <!-- choosing what tequiniequs you want to see with collapsible-->
  <ul class="collapsible" id="collapsibleTequniques">
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>Techniky</div>
      <div class="collapsible-body" id="collapsibleTequniques">
        <span>
          <div id="techniquesChooser"></div>
        </span>
      </div>
    </li>
  </ul>
  <div id="here">	
	</div>
  <!-- Editace slovicka/techniky -->
  <div id="modal1" class="modal">
    <div class="modal-content edit-slova"> 
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <!-- Pridavani slovicka -->
  <div id="modal2" class="modal">
    <div class="modal-content"> 
      <form id="add_new_word">
        <input type="text" name="japanese" id="japanese" placeholder="japanese">
        <input type="text" name="czech" id="czech" placeholder="czech">
        <input type="submit" name="submit">
      </form>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <!-- Editace typů -->
  <div id="modal3" class="modal">
    <div class="modal-content edit-typu"> 
      <form id="add_new_type">
        <input type="text" name="type" id="type" placeholder="Typ">
        <input type="submit" name="submit">
        <br>
        <br>
      </form>
      <div id="types-view"></div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <!-- Pridavani technik -->
  <div id="modal4" class="modal">
    <div class="modal-content"> 
      <form id="add_new_technique">
        <input type="text" name="japanese" id="japanese-technique" placeholder="japanese">
        <input type="text" name="czech" id="czech-technique" placeholder="czech">
        <textarea placeholder="Desription" id="description"></textarea>
        <input type="file" name="picture" id="image"><br>
      	<div class="input-field col s5">
          <select class="select-technique" style="display: block;">
        		<option value="">Vyberte typ</option>
        	</select>
      	</div>
        <input type="submit" name="submit">
      </form>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <div id="modal5" class="modal">
    <div class="modal-content delete-alert"> 
      <h3>Opravdu chcete smazat?</h3>
      <button class="delete-word">Ano</button>
      <button class="modal-close">Ne</button>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <?=renderJsLink(2)?>
</body>
</html>