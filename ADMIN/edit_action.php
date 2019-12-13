<?php
	include 'db.php';
	$japanese = $_POST['japanese'];
	$czech = $_POST['czech'];
	$type = $_POST['type'];
	$id = $_POST['id'];

	$data = array(
			':id' => $id,
			':japanese' => $japanese,
			':czech' => $czech,
			':type' => $type
	);

	$sql = "UPDATE slovicka SET japanese = :japanese, czech = :czech, type = :type WHERE ID = :id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
?>