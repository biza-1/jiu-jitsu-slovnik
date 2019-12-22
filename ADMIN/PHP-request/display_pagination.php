<?php // dotaz pro ziskani typu pro vyber technik, ktere chce zobrazit || BIZA
	if (isset($_POST['checking'])) {
		include '../includer.php';

		$sql = "SELECT COUNT(ID) FROM slovicka";
		$sqlProvedeni = $db->prepare($sql);
		$sqlProvedeni->execute();
		$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

		echo render_pagination($data[0]['COUNT(ID)'] / 50);
	}
	
?>