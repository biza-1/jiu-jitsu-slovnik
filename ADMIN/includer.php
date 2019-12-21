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
			header("location: /slovnik/admin/pages");
			//echo "je administrator";
		}
	} else {
		//echo "ca";
		if (empty($_SESSION["adminID"])) {
			header("location: /slovnik/admin/login/");
			//echo "neni administrator";
		}
	}

	
	/*
	if (empty($_SESSION["adminID"])) {
		header("location: /slovnik/admin/login/");
	}
	*/
	
?>