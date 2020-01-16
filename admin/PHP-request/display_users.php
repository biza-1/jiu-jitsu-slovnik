<?php // dotaz pro vypsani uzivatelu || Duchoslav
	include '../includer.php';

	$sql = "SELECT * FROM users";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	$sql2 = "SELECT * FROM admin";
	$sqlProvedeni2 = $db->prepare($sql2);
	$sqlProvedeni2->execute();
	$data2 = $sqlProvedeni2->fetchAll(PDO::FETCH_ASSOC);

	echo users_result($data, $data2);
?>