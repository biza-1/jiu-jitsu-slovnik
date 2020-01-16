<?php
include "../includer.php";
?>
<!DOCTYPE html>
<html lang="cs">

<head>
	<!-- TODO Add name of website (meta tags) based on what he searched -->
	<?= renderHead('Štítky', 1) ?>
</head>

<body>
    <?= renderSideNav(1) ?>
    <div class="w3-bar w3-gray" id="uppermenu">
      <a href=".." class="w3-bar-item w3-button w3-padding-16">Jiu-Jitsu</a>
      <!-- sidenav - caller-->
      <div class="w3-bar-item w3-button w3-right w3-padding-16" onclick="w3_open()" style="padding: 12px 10px !important;"><i class="material-icons">menu</i></div>
    </div>
	<div class="w3-bar">
		<a class="modal-trigger w3-bar-item w3-button" href="#modal1" id="StitkyModalOpener"><i class="material-icons icons-space">cloud_upload</i>Nahrát Štítky</a>
		<a class="modal-trigger w3-bar-item w3-button" href="#modal2" id="StitkyModalOpener"><i class="material-icons icons-space">file_download</i>Stáhnout Štítky</a>
	</div>
	<div id="StitykDiv">
		<div class="row">
			<form class="col s12" id="stitkyForm">
				<div class="w3-bar">
					<div class="w3-bar-item">
						<label for="nazevStitku">Název štítku:</label>
					</div>
				</div>
				<div class="w3-bar">
					<div class="w3-bar-item">
						<input id="nazevStitku" type="text" class="validate input_css " data-lpignore="true">
					</div>
					<div class="w3-bar-item" style="padding:0;padding: 0;margin-top: 4px;">
						<i class="material-icons w3-button" id="pridatStitekButton">add</i>
					</div>
				
					<p class="w3-bar w3-padding-16" id="StitkyMessage"></p>
				</div>
			</form>
		<li class="divider"></li>
		</div>
		<div id="modalStitkyConrolerrDiv">
		</div>

	</div>


	<!-- modal for making sure he wants to upload -->
	<div id="modal1" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
		<div class="modal-content" id="LabelAdd"> 
			<h2>Jsi si jistý? Tato akce přemaže tvůj stávacíjí záznam v databázi.</h2>
		</div>
		<div class="modal-footer w3-bar" id="LabelAddFooter">   
			<a href="#!" class="modal-close w3-bar-item w3-button w3-right">Zrušit</a>     
			<a href="#!" class="modal-close w3-bar-item w3-button w3-right"  id="uploadStitky">Ok</a>
		</div>
	</div>
	<!-- modal for making sure he wants to download -->
	<div id="modal2" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
		<div class="modal-content" id="LabelAdd"> 
			<h2>Jsi si jistý? Tato akce stáhne data z databáze a přemaže tvé uložené štítky</h2>
		</div>
		<div class="modal-footer w3-bar" id="LabelAddFooter">   
			<a href="#!" class="modal-close w3-bar-item w3-button w3-right">Zrušit</a>     
			<a href="#!" class="modal-close w3-bar-item w3-button w3-right"  id="uploadStitky">Ok</a>
		</div>
	</div>
	<!-- when is not logged in -->
	<div id="modal3" class="modal">
    <div class="w3-bar"><i class="material-icons w3-right modal-close w3-button">close</i></div>
		<div class="modal-content" id="LabelAdd"> 
			<h2>Štítky jsou přístupné pouze po přihlášení</h2>
		</div>
		<div class="modal-footer" id="LabelAddFooter">         
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
		</div>
	</div>
	<!-- info modal -->
	<div id="modalINFO" class="modal">
		<div id="modal-contentINFO"> 
		</div>
		<div class="modal-footer">
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
		</div>
	</div>
	<?= renderJSSubLinks(1, 'callersearchStitky.js') ?>
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