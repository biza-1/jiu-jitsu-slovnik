<?php
require_once '../../login/vendor/autoload.php';
include '../includer.php';
$id_token = $_POST["id_token"];
$CLIENT_ID = '636828796753-r17p2u4sndhmv39qfkc0trngggnvj1qs.apps.googleusercontent.com';
$client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
$payload = $client->verifyIdToken($id_token);
if ($payload) {
	$email = $payload['email'];
	$name = $payload['given_name'];
	$surname = $payload['family_name'];
	$picture = $payload['picture'];

	$data = array(
		':email' => $email,
		':name' => $name,
		':surname' => $surname,
		':picture' => $picture
	);
	$sql = "INSERT INTO users (email, name, surname, picture) VALUES (:email, :name, :surname, :picture) ON DUPLICATE KEY UPDATE name= :name , surname = :surname, picture = :picture";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);

	$data = array(':email' => $email);
	$sql = "SELECT ID FROM users WHERE email = :email";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	if (!empty($data[0]['ID'])) {
		//echo json_encode($data[0]['ID']);
		$_SESSION["userID"] = $data[0]['ID'];
		echo "vseOK";
		echo '||&^*&%^^*(%*&^&&*(&(*&((*@*';
		$araya = [];
		$araya['ID'] = $data[0]['ID'];
		$araya['name'] = $name;
		$araya['surname'] = $surname;
		$araya['picture'] = $picture;
		$araya['email'] = $email;
		echo json_encode($araya);
	}
} else {
	// Invalid ID token
}
