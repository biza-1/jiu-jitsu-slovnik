<?php // dotaz pro ziskani typu pro vyber technik, ktere chce zobrazit || BIZA
	if (isset($_POST['checking'])) {
		include '../includer.php';
		$type = "technique";

		$sql = "SELECT * FROM metadata WHERE type = 'technique'";
		$sqlProvedeni = $db->prepare($sql);
		$sqlProvedeni->execute();
		$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

		//var_dump($data);
		echo techniques_vyber_result($data);
	}
	
?>