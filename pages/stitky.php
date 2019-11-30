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
	<a class="waves-effect waves-light btn modal-trigger" href="#modal1" id="StitkyModalOpener">Nahrát Štítky</a>
	<a class="waves-effect waves-light btn modal-trigger" href="#modal2" id="StitkyModalOpener">Stáhnout Štítky</a>
	<div id="StitykDiv">

		<div class="row">
			<form class="col s12" id="stitkyForm">
				<div class="row">
					<div class="input-field col s10">
						<input id="nazevStitku" type="text" class="validate" data-lpignore="true">
						<label for="nazevStitku">Název štítku</label>
						<p class="flow-text red" id="StitkyMessage"></p>
					</div>
					<a class="btn-floating btn-large waves-effect waves-light red right" id="pridatStitekButton"><i class="material-icons">add</i></a>
				</div>
			</form>

		</div>
		<div id="modalStitkyConrolerrDiv">
		</div>

	</div>


	<!-- modal for making sure he wants to upload -->
	<div id="modal1" class="modal">
		<div class="modal-content" id="LabelAdd"> 
			<h2>Jsi si jistý? Tato akce přemaže tvůj stávacíjí záznam v databázi.</h2>
		</div>
		<div class="modal-footer" id="LabelAddFooter">   
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Zrušit</a>     
		<a href="#!" class="modal-close waves-effect waves-green btn-flat"  id="uploadStitky">Ok</a>
		</div>
	</div>
	<!-- modal for making sure he wants to download -->
	<div id="modal2" class="modal">
		<div class="modal-content" id="LabelAdd"> 
			<h2>Jsi si jistý? Tato akce stáhne data z databáze a přemaže tvé uložené štítky</h2>
		</div>
		<div class="modal-footer" id="LabelAddFooter">        
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Zrušit</a>     
		<a href="#!" class="modal-close waves-effect waves-green btn-flat" id="downloadStitky">Ok</a>
		</div>
	</div>
	<!-- when is not logged in -->
	<div id="modal3" class="modal">
		<div class="modal-content" id="LabelAdd"> 
			<h2>Štítky jsou přístupné pouze po přihlášení</h2>
		</div>
		<div class="modal-footer" id="LabelAddFooter">         
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
		</div>
	</div>
	<?= renderJSSubLinks(1, 'callersearchStitky.js') ?>
</body>

</html>