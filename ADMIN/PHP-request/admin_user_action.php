<?php // prida nebo odebere uzivateli admin || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$data = array(
		':ID' => $ID
	);
	$sql = "SELECT * FROM admin WHERE AdminID = :ID";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC); 
	var_dump($data);

	if (count($data) == 0) {
		$data = array(
			':ID' => $ID
		);

		$sql = "INSERT INTO admin (AdminID) VALUES (:ID)";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Z uživatele se stal admin";
	} else {
		$data = array(
			':del_id' => $ID
		);
		$sql = "DELETE FROM admin WHERE AdminID = :del_id";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Uživateli bylo odebráno admin";
	}
?>