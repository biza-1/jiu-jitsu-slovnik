<?php // vyhledavani v databazi || Duchoslav    
	include '../includer.php';
	$offsetik = ($_POST['pagination'] - 1) * 50;
	$limitik = 50;

	$sql2 = "SELECT * FROM admin";
	$sqlProvedeni2 = $db->prepare($sql2);
	$sqlProvedeni2->execute();
	$data2 = $sqlProvedeni2->fetchAll(PDO::FETCH_ASSOC);

	$text = $_POST['q'];
	$text = htmlspecialchars($text);
	//$get_name = $db->prepare("SELECT * FROM users WHERE email LIKE concat('%', :email, '%') LIMIT " . $limitik . " OFFSET " . $offsetik . "");
	$get_name = $db->prepare("SELECT * FROM users WHERE email LIKE concat('%', :email, '%') OR name LIKE concat('%', :email, '%') OR surname LIKE concat('%', :email, '%') LIMIT " . $limitik . " OFFSET " . $offsetik . "");
	$get_name->execute(array('email' => $text));
	while ($names = $get_name->fetch(PDO::FETCH_ASSOC)) {
		$return[] = $names;
	}
	// pagination
	if ($_POST['new'] == 'new') {
		//$sqlProvedeni = $db->prepare("SELECT COUNT(ID) FROM users WHERE email LIKE concat('%', :email, '%')");
		$sqlProvedeni = $db->prepare("SELECT COUNT(ID) FROM users WHERE email LIKE concat('%', :email, '%') OR name LIKE concat('%', :email, '%') OR surname LIKE concat('%', :email, '%')");
		$sqlProvedeni->execute(array('email' => $text));
		$data553 = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
	}
	if (is_array($return) || is_object($return)) {
		echo users_result($return, $data2);
		echo "||&^*&%^^*(%*&^&&*(&(*&((*@*";
		if ($_POST['new'] == 'new') {
			if ($data553[0]['COUNT(ID)'] != "0") {
				echo render_pagination($data553[0]['COUNT(ID)'] / 50);
			}
		}
	}
?>