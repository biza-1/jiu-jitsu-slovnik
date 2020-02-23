<?php // includovani veci || Duchoslav
	session_start();

	include 'PHP/render.php';
	include 'PHP/connect.php';
	include 'PHP/db.php';
	include 'PHP/functions.php';
	//var_dump($_SESSION);

	$host = $_SERVER['REQUEST_URI'];
	if ($host == '/slovnik/admin/login/' OR $host == '/slovnik/admin/login/overeni.php') {
		if (!empty($_SESSION["adminID"])) {
			header("location: /slovnik/admin/pages/sprava_slovicek/search.php");
			exit();
			//echo "je administrator";
		} else {
			//echo "Nejste admin";
		} 
	} else {
		if (empty($_SESSION["adminID"]) OR $host == '/slovnik/admin/') {
			header("location: /slovnik/admin/login/");
			exit();
			//echo "neni administrator";
		}
	}
?>