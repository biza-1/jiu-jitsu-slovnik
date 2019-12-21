<?php
	require_once '../../../login/vendor/autoload.php';
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
		
		$data = array(':email' => $email);
		$sql = "SELECT * FROM users WHERE email = :email";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
			$data = array(
				':email' => $email,
				':name' => $name,
				':surname' => $surname,
				':picture' => $picture
			);
			$sql = "INSERT INTO users (email, name, surname, picture) VALUES (:email, :name, :surname, :picture)";
			$sqlProvedeni = $db->prepare($sql);
			$stav = $sqlProvedeni->execute($data);
		} else {
			$id_user = $data[0]['ID'];
			//echo json_encode($data[0]['ID']);
			$data = array(':id_user' => $id_user);
			$sql = "SELECT ID FROM users INNER JOIN admin ON users.ID = admin.AdminID WHERE ID = :id_user";
			$sqlProvedeni = $db->prepare($sql);
			$stav = $sqlProvedeni->execute($data);
			$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);
			var_dump($data);
			if (!empty($data[0]['ID'])) {
				echo "Je admin";
				$_SESSION["userID"] = $id_user;
				$_SESSION["adminID"] = $id_user;
				echo $_SESSION["userID"];
				echo "Je admin".$_SESSION["adminID"];
			} else {
				echo "Neni admin";
				$_SESSION["userID"] = $id_user;
				echo $_SESSION["userID"];
			}
		}
	} else {
	  // Invalid ID token
	} 	
?>