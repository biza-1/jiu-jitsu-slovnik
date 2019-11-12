<?php // pridani noveho typu do databaze || Duchoslav
	include '../includer.php';
	if (!empty($_POST['type'])) {
		$value = $_POST['type'];
		$type = "technique";

		$data = array(':value' => $value);
		$sql = "SELECT * FROM metadata WHERE value = :value";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
			$data = array(
				':value' => $value,
				':type' => $type
			);

			$sql = "INSERT INTO metadata (type, value) VALUES (:type, :value)";
			$sqlProvedeni = $db->prepare($sql);
			$stav = $sqlProvedeni->execute($data);
			echo "Typ byl přidáno";
		} else {
			echo "Typ už je v databázi";
		}
	} else {
		echo "Musíte vyplnit pole";
	}
?>