<?php // dotaz pro smazani uzivatele || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	// smazani z users
	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM users WHERE ID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

	// smazani z admin
	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM admin WHERE AdminID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

	// smazani z UsertStitky
	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM UsertStitky WHERE UserID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

	if ($stav) {
		echo "Uživatek byl smazán";
	}
?>