<?php // dotaz pro upravu typu || Duchoslav
	include '../includer.php';
	$value = $_POST['value'];
	$id = $_POST['id'];

	$data = array(
			':id' => $id,
			':value' => $value
	);

	$sql = "UPDATE metadata SET value = :value WHERE ID = :id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
?>