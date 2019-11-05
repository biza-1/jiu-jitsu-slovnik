<?php // vyhledavani v databazi || Duchoslav    
	include '../includer.php';
	
	$text = $_GET['q'];
	// let's filter the data that comes in
	$text = htmlspecialchars($text);
	// prepare the mysql query to select the users 
	$get_name = $db->prepare("SELECT * FROM slovicka WHERE japanese LIKE concat('%', :name, '%')");
	// execute the query
	$get_name -> execute(array('name' => $text));
	// show the users on the page
	while($names = $get_name->fetch(PDO::FETCH_ASSOC)){
		$return[] = $names;
	}
	if (is_array($return) || is_object($return)) {
		echo search_result_render($return);
	}


	// OLD VERSION, NOT PDO
	/*   
    if (!empty($_GET['q'])) {
		include '../includer.php';
    	$q = $_GET['q'];
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