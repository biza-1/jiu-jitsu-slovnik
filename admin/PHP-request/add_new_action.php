<?php // pridani noveho slovicka do databaze || Duchoslav
	include '../includer.php';
	if (!empty($_POST['japanese']) AND !empty($_POST['czech'])) {
		$japanese = $_POST['japanese'];
		$czech = $_POST['czech'];
		$type = "word";
		$textarea_dcs = $_POST['description'];
		$description = '<p>' . implode('</p><p>', array_filter(explode("\n", $textarea_dcs))) . '</p>';


		$data = array(':japanese' => $japanese);
		$sql = "SELECT * FROM slovicka WHERE japanese = :japanese";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
			$data = array(
				':japanese' => $japanese,
				':czech' => $czech,
				':type' => $type,					
				':content' => $description
			);

			$sql = "INSERT INTO slovicka (japanese, czech, type, content) VALUES (:japanese, :czech, :type, :content)";
			$sqlProvedeni = $db->prepare($sql);
			$stav = $sqlProvedeni->execute($data);
			echo "Slovíčko bylo přidáno";
		} else {
			echo "Slovíčko už je v databázi";
		}
	} else {
		echo "Musíte vyplnit obě pole";
	}
?>