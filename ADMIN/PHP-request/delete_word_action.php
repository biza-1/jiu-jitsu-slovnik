<?php // dotaz pro smazani slovicka || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$sql = "SELECT * FROM slovicka WHERE ID = $ID";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	$type = $data[0]['type'];
	if ($type !== 'word') {
		$data = array(':del_id' => $ID );
		$sql = "DELETE FROM slovicka WHERE ID = :del_id";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);

		$data = array(':del_id' => $ID );
		$sql = "DELETE FROM techniky WHERE ID = :del_id";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Technika byla smazana";
	} else {
		$data = array(':del_id' => $ID );
		$sql = "DELETE FROM slovicka WHERE ID = :del_id";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		echo "Slovicko bylo smazano";
	}
	/*
	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM slovicka WHERE ID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	*/
?>