<?php // pridani nove techniky do databaze || Duchoslav
	include '../includer.php';
	if (!empty($_POST['japanese']) AND !empty($_POST['czech']) AND !empty($_POST['description'])) {
		$japanese = $_POST['japanese'];
		$czech = $_POST['czech'];
		$description = $_POST['description'];
		$type = $_POST['type'];
		echo $description;
		// kontrola jestli uz neni v DB
		$data = array(':japanese' => $japanese);
		$sql = "SELECT * FROM slovicka WHERE japanese = :japanese";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute($data);
		$data = $sqlProvedeni-> fetchAll(PDO::FETCH_ASSOC);

		if (count($data) == 0) {
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
				$imageUrl = save_image($ID, $_FILES, 'picture');
			}
			$data = array(
				':ID' => $ID,
				':imageUrl' => $imageUrl,
				':content' => $description
			);

			$sql = "INSERT INTO techniky (ID, imageUrl, content) VALUES (:ID, :imageUrl, :content)";
			$sqlProvedeni = $db->prepare($sql);
			$stav = $sqlProvedeni->execute($data);


			echo "Slovíčko bylo přidáno";
		} else {
			echo "Slovíčko už je v databázi";
		}
	} else {
		echo "Musíte vyplnit obě pole";
	}
?>