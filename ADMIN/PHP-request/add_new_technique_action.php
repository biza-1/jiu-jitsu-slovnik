<?php // pridani nove techniky do databaze || Duchoslav
	include '../includer.php';

	if (!empty($_POST['japanese']) AND !empty($_POST['czech']) AND !empty($_POST['description'])) {
		$japanese = $_POST['japanese'];
		$czech = $_POST['czech'];
		$description = $_POST['description'];
		$type = $_POST['type'];

		// kontrola jestli uz neni v DB
		$data = array(':japanese' => $japanese);
		$sql = "SELECT * FROM slovicka WHERE japanese = :japanese";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
			$errors = array();
		    $maxsize = 2097152;
		    $acceptable = array(
		        'image/jpeg',
		        'image/jpg',
		        'image/gif',
		        'image/png'
		    );

		    if(($_FILES['picture']['size'] >= $maxsize)) {
		        $errors[] = 'Obrázek je moc velký. Obrázek může mít maximálně 2MB.';
		    }

		    if((!in_array($_FILES['picture']['type'], $acceptable)) && (!empty($_FILES["picture"]["type"]))) {
		        $errors[] = 'Špatný typ souboru. Může být jenom JPG, JPEG, GIF a PNG.';
		    }


		    if(count($errors) === 0) {
		    	$data = array(
					':japanese' => $japanese,
					':czech' => $czech,
					':type' => $type
				);

				$sql = "INSERT INTO slovicka (japanese, czech, type) VALUES (:japanese, :czech, :type)";
				$sqlProvedeni = $db->prepare($sql);
				$stav = $sqlProvedeni->execute($data);


				$data = array(':japanese' => $japanese);
				$sql = "SELECT * FROM slovicka WHERE japanese = :japanese";
				$sqlProvedeni = $db->prepare($sql);
				$stav = $sqlProvedeni->execute($data);
				$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

				$ID = $data[0]['ID'];
				if ($_FILES['picture']['name'] === "") {
					$imageUrl = "neni.jpg";
				} else {
					store_uploaded_image($ID, 'picture', 600, 600);
					$imageUrl = save_image($ID, $_FILES['picture'], "../img/");
					
			    	$data = array(
						':ID' => $ID,
						':imageUrl' => $imageUrl,
						':content' => $description
					);

					$sql = "INSERT INTO techniky (ID, imageUrl, content) VALUES (:ID, :imageUrl, :content)";
					$sqlProvedeni = $db->prepare($sql);
					$stav = $sqlProvedeni->execute($data);
				    
				}
				echo "Technika byla přidáno";
		    } else {
		        foreach($errors as $error) {
		            echo $error;
		        }
		    }
		} else {
			echo "Slovíčko už je v databázi";
		}
	} else {
		echo "Musíte vyplnit všechny pole";
	}
