<?php // dotaz pro smazani uzivatele || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM users WHERE ID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

	if ($stav) {
		echo "Uživatek byl smazán";
	}
?>