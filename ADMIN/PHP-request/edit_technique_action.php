<?php // kod pro editace technik/slovicek || Duchoslav
	include '../includer.php';
	if (!empty($_POST['japanese']) AND !empty($_POST['czech'])) {
		$japanese = $_POST['japanese'];
		$id = $_POST['id'];
		
		$data = array(
			':japanese' => $japanese,
			':id' => $id
		);
		$sql = "SELECT * FROM slovicka WHERE japanese = :japanese AND ID <> :id";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
			if ($_POST['type'] !== 'undefined') { // podle teto podminky se rozlissi jestli je to slovicko nebo technika => slovicko nema type || Duchoslav
				// EDITACE TECHNIKY
				if (!empty($_POST['japanese']) AND !empty($_POST['czech']) AND !empty($_POST['description'])) {
					$id = $_POST['id'];
					$japanese = $_POST['japanese'];
					$czech = $_POST['czech'];
					$description = $_POST['description'];
					$type = $_POST['type'];

					$data = array(
						':id' => $id,
						':japanese' => $japanese,
						':czech' => $czech,
						':type' => $type,
					);

					$sql = "UPDATE slovicka SET japanese = :japanese, czech = :czech, type = :type WHERE ID = :id"; // updatuje v DB slovicka hodnoty japanese, czech, type || Duchoslav
					//$sql = "UPDATE slovicka SET japanese = :japanese, czech = :czech WHERE ID = :id";
					$sqlProvedeni = $db->prepare($sql);
					$stav = $sqlProvedeni->execute($data);

					
					if ($_FILES['picture']['name'] === "") {
						$data = array(':id' => $id,);
						$sql = "SELECT * FROM techniky WHERE ID = :id";
						$sqlProvedeni = $db->prepare($sql);
						$stav = $sqlProvedeni->execute($data);
						$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);
						
						$url = $data[0]['imageUrl'];
						if ($url !== "neni.jpg") {
							$imageUrl = $url;
						} else {
							$imageUrl = "neni.jpg";
						}
					} else {
						store_uploaded_image($id, 'picture', 600, 600);
						$imageUrl = save_image($id, $_FILES['picture'], "../img/");
					}
					$data = array(
						':id' => $id,
						':imageUrl' => $imageUrl,
						':content' => $description
					);
					$sql = "UPDATE techniky SET imageUrl = :imageUrl, content = :content WHERE ID = :id"; // updatuje v DB techniky hodnoty imageUrl, content || Duchoslav
					$sqlProvedeni = $db->prepare($sql);
					$stav = $sqlProvedeni->execute($data);


					echo "Technika byla upravena";
				} else {
					echo "Musíte vyplnit všechny pole";
				}
			} else {
				// EDITACE SLOVICKA
				$japanese = $_POST['japanese'];
				$czech = $_POST['czech'];
				$id = $_POST['id'];

				$data = array(
						':id' => $id,
						':japanese' => $japanese,
						':czech' => $czech,
				);

				$sql = "UPDATE slovicka SET japanese = :japanese, czech = :czech WHERE ID = :id"; // updatuje v DB slovicka hodnoty japanese, czech || Duchoslav
				$sqlProvedeni = $db->prepare($sql);
				$stav = $sqlProvedeni->execute($data);
				echo "Slovíčko bylo upraveno";
			}
		} else {
			echo "Technika už je v databázi";
		}
	} else {
		echo "Musíte vyplnit všechna pole";
	}

	
	
?>