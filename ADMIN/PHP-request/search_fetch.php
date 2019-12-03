<?php // vyhledavani v databazi || Duchoslav    
	include '../includer.php';
	
	$text = $_POST['q'];
	$language = $_POST['language'];

	
	// let's filter the data that comes in
	$text = htmlspecialchars($text);
	// prepare the mysql query to select the users 
	if ($_POST['showAllThing'] == "true") {
		$get_name = $db->prepare("SELECT slovicka.ID, slovicka.japanese, slovicka.czech, slovicka.type, techniky.imageUrl, techniky.content FROM slovicka LEFT JOIN `techniky` ON slovicka.ID=techniky.ID WHERE ".$language ."  LIKE concat('%', '".$text ."', '%')");
	} else {
		if ($_POST['ifwannaWords'] == "true" AND $_POST['ifwannaTechniques'] == "true") {
			$whatType = '"word",';
			$meziArray = explode(",", $_POST['allTechniquesChecked']);
			foreach ($meziArray as $key => $value) {
				$whatType .= '"'.$value.'",';
			}
			$whatType = rtrim($whatType, ',');
			
		} elseif ($_POST['ifwannaWords'] == "true") {
			$whatType = '"word"';
		} elseif ($_POST['ifwannaTechniques'] == "true") {
			$whatType = '';
			$meziArray = explode(",", $_POST['allTechniquesChecked']);
			foreach ($meziArray as $key => $value) {
				$whatType .= '"'.$value.'",';
			}
			$whatType = rtrim($whatType, ',');
		}
		$get_name = $db->prepare("SELECT slovicka.ID, slovicka.japanese, slovicka.czech, slovicka.type, techniky.imageUrl, techniky.content FROM slovicka LEFT JOIN `techniky` ON slovicka.ID=techniky.ID WHERE ".$language ." LIKE concat('%', '".$text ."', '%') AND type IN (".$whatType.")");
	}
	
	// execute the query
	$get_name -> execute(/*array('name' => $text, 'language' => $language)*/);
	// show the users on the page

	$return = $get_name->fetchAll(PDO::FETCH_ASSOC);
	if (is_array($return) || is_object($return)) {
		echo search_result_render($return, $language);
		echo "||&^*&%^^*(%*&^&&*(&(*&((*@*";
		echo json_encode($return);
	}


	// OLD VERSION, NOT PDO
	/*   
    if (!empty($_POST['q'])) {
		include '../includer.php';
    	$q = $_POST['q'];
    	$query = "select * from slovicka where japanese like '%$q%'";
    	$result = mysqli_query($conn,$query);
    	$return = [];
    	while ($output=mysqli_fetch_assoc($result)) {
    		$return[] = $output; 
    	}
		echo search_result_render($return);	
    }
    */
?>