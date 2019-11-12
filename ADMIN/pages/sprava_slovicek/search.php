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
	<input type="search" name="search" id="search">
	<a class="waves-effect waves-light btn" id="japan_czech">CZ</a><br>
  <div id="here">	
	</div>
  <!-- Editace slovicka -->
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
  <?=renderJsLink(2)?>
</body>
</html>