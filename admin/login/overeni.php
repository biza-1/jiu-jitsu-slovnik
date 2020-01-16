<?php
    include '../includer.php';
	require_once '../../../login/vendor/autoload.php';	
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
        $sql = "SELECT ID FROM users INNER JOIN admin ON users.ID = admin.AdminID WHERE email = :email";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute($data);
        $data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);
        
        if (!empty($data[0]['ID'])) {
            echo "ADMIN";
            $_SESSION["userID"] = $data[0]['ID'];
            $_SESSION["adminID"] = $data[0]['ID'];
            $_SESSION['userINFO']['name'] = $name;
            $_SESSION['userINFO']['email'] = $email;
            $_SESSION['userINFO']['surname'] = $surname;
            $_SESSION['userINFO']['picture'] = $picture;
        } else {
            echo "Neni admin";
            $_SESSION["userID"] = $data[0]['ID'];
        }
		
	} else {
        // Invalid ID token
        echo "INVALID ID TOKEN";
	}
?>