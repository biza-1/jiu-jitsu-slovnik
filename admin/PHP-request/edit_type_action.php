<?php // dotaz pro upravu typu || Duchoslav
	include '../includer.php';
	$value = $_POST['value'];
	$id = $_POST['id'];
	$originalName = $_POST['originalname'];

	$data = array(
			':id' => $id,
			':value' => $value
	);

	$sql = "UPDATE metadata SET value = :value WHERE ID = :id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = array(
		':value' => $value,
		':originalName' => $originalName
	);
	$sql = "UPDATE slovicka SET type = :value  WHERE type = :originalName";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
?>