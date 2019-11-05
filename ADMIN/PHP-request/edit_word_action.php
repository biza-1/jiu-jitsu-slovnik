<?php // dotaz pro upravu slovicka || Duchoslav
	include '../includer.php';
	$japanese = $_POST['japanese'];
	$czech = $_POST['czech'];
	//$type = $_POST['type'];
	$id = $_POST['id'];

	$data = array(
			':id' => $id,
			':japanese' => $japanese,
			':czech' => $czech,
			//':type' => $type    , type = :type
	);

	$sql = "UPDATE slovicka SET japanese = :japanese, czech = :czech WHERE ID = :id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
?>