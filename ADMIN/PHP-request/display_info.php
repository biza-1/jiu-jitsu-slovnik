<?php // dotaz pro nalezeni informaci v popup okne || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$sql = "SELECT * FROM slovicka WHERE ID = $ID";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	echo popup_result($data);
?>