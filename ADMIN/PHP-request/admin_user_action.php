<?php // prida nebo odebere uzivateli admin || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$data = array(
		':ID' => $ID,
		':type' => "user"
	);
	$sql = "SELECT * FROM metadata WHERE ID = :ID AND type = :type";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC); 

	if (count($data) == 0) {
		$type = "user";
		$value = "admin";

		$data = array(
			':ID' => $ID,
			':type' => $type,
			':value' => $value
		);

		$sql = "INSERT INTO metadata (ID, type, value) VALUES (:ID, :type, :value)";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Z uživatele se stal admin";
	} else {
		$data = array(
			':del_id' => $ID,
			':type' => "user"
		);
		$sql = "DELETE FROM metadata WHERE ID = :del_id AND type = :type";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Uživateli bylo odebráno admin";
	}
?>