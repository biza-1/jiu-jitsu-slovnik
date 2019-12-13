<?php
  include '../includer.php';
?>
<!DOCTYPE html>
<html>
<head>
	<?=renderHead("Vyhledávání", 1)?>
</head>
<body>
	<input type="search" name="search" id="search">
	<div id="here">	
	</div>
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  <?=renderJsLink(1)?>
</body>
</html>