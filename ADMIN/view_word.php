<?php
	include 'db.php';
	//echo $_GET['id'];

	$ID_word = $_GET['id'];
	$sql = "SELECT * FROM slovicka WHERE ID = $ID_word";
	$sqlProvedeni = $db->prepare($sql);
	$sqlProvedeni->execute();
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
	
	
	$japanese = $data[0]['japanese'];
	$czech = $data[0]['czech'];
	$type = $data[0]['type'];
?>
<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<title>View slovicko</title>
</head>
<body>
	<form action="edit_action.php" method="POST" id="form">
		<input type="text" name="japanese" id="japanese" value="<?=$japanese?>"><br>
		<input type="text" name="czech" id="czech" value="<?=$czech?>"><br>
		<select name="type" id="type">
			<option value="slovo">Slovo</option>
			<option value="slovo2">Slovo2</option>
		</select><br>
		<input type="submit" name="submit" id="submit">
	</form>
	<button id="delete">Delete</button>

	<script>
		$("#form").submit(function(e) {
			e.preventDefault();

			var japanese = $("#japanese").val();
			var czech = $("#czech").val();
			var type = $("#type").val();
			var id = "<?php echo $ID_word ?>";

			$.ajax({
		        type: "POST",
		        url: "PHP-request/edit_word_action.php",
		        data: "japanese=" + japanese+ "&czech=" + czech+ "&type=" + type+ "&id=" + id,
		        success: function() {
		        	alert("Upraveno");
		        }
	    	});
		});

		$("#delete").click(function(e) {
			e.preventDefault();
			
			var id = "<?php echo $ID_word ?>";

			$.ajax({
		        type: "POST",
		        url: "PHP-request/delete_word_action.php",
		        data: "id=" + id,
		        success: function() {
		        	alert("Odstraneno");
		        	window.location = 'search.php';
		        }
	    	});
		});
	</script>
</body>
</html>