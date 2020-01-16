<?php // dotaz pro nalezeni typu v popup okne || Duchoslav
	include '../includer.php';
	$type = "technique";

	$sql = "SELECT * FROM metadata WHERE type = 'technique'";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	//var_dump($data);
	//echo techniques_result($data);
	echo json_encode($data);
?>