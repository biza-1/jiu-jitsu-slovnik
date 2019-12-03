<?php // dotaz pro vypsani uzivatelu || Duchoslav
	include '../includer.php';

	$sql = "SELECT * FROM users";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	echo users_result($data);
?>