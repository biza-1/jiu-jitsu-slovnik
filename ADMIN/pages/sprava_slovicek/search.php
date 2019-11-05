<?php
  include '../../includer.php';
?>
<!DOCTYPE html>
<html>
<head>
	<?=renderHead("Vyhledávání", 2)?>
</head>
<body>
	<input type="search" name="search" id="search">
	<div id="here">	
	</div>
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content"> 
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>
  <?=renderJsLink(2)?>
</body>
</html>