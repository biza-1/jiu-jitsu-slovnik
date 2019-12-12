<?php
	include '../includer.php';
	$email = $_POST['email'];
	$name = $_POST['name'];
	$picture = $_POST['obrazek'];

	$data = array(':email' => $email);
	$sql = "SELECT * FROM users WHERE email = :email";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

	if (count($data) == 0) {
		$data = array(
			':email' => $email,
			':name' => $name,
			':picture' => $picture
		);

		$sql = "INSERT INTO users (email, name, picture) VALUES (:email, :name, :picture)";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);

		$data = array(':email' => $email);
		$sql = "SELECT * FROM users WHERE email = :email";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($data[0]['ID']);

	} else {
		echo json_encode($data[0]['ID']);
	}
