<?php // dotaz pro nalezeni informaci v popup okne || Duchoslav
	include '../includer.php';
	$ID = $_POST['id'];

	$sql = "SELECT * FROM slovicka WHERE ID = $ID";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	$type = $data[0]['type'];
	
	if ($type !== 'word') {
		$sql1 = "SELECT * FROM techniky WHERE ID = $ID";
		$sqlProvedeni1 = $db->prepare($sql1);
		$sqlProvedeni1->execute();
		$data1 = $sqlProvedeni1->fetchAll(PDO::FETCH_ASSOC);

		$sql2 = "SELECT * FROM metadata WHERE type = 'technique'";
		$sqlProvedeni2 = $db->prepare($sql2);
		$sqlProvedeni2->execute();
		$data2 = $sqlProvedeni2->fetchAll(PDO::FETCH_ASSOC);
		
		echo popup_result_technique($data, $data1, $data2);
	} else {
		echo popup_result($data);
	}
	
?>