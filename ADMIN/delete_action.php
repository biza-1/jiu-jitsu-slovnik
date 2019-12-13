<?php
	include 'db.php';
	$ID = $_POST['id'];

	$data = array(':del_id' => $ID );
	$sql = "DELETE FROM slovicka WHERE ID = :del_id";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

?>