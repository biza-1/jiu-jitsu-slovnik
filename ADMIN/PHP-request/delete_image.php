<?php // kod pro smazani obrazku
	include '../includer.php';
	$ID = $_POST['id'];
	$url = "neni.jpg";

	$data = array(
		':id' => $ID,
		':imageUrl' => $url
	);
	$sql = "UPDATE techniky SET imageUrl = :imageUrl WHERE ID = :id"; // updatuje v DB techniky hodnotu imageUrl || Duchoslav
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

?>