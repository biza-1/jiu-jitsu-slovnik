<?php
  include "db.php";

function View($orderby, $ASC){ // ukaze data  |x| CECH 
	global $db;
	$id = 0;

		$sql="SELECT * FROM community ORDER BY $orderby $ASC";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute();
		$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

		//all the sort buttons
		echo '<div id="this">
		<div class="w3-bar">
		<!-- BUTTONS FOR SORTING BY-->
		  <div class="w3-bar-item w3-button"><a href="" style="padding:0 !important;" class="sorts" data-sort="japanese"><span>Jap</span></a></div>
		  <div class="w3-bar-item w3-button"><a href="" style="padding:0 !important;" class="sorts" data-sort="czech"><span>Czech</span></a></div>
		  <div class="w3-bar-item w3-button"><a href="" style="padding:0 !important;" class="sorts" data-sort="vote"><span>Vote</span></a></div>
		</div>
		<li class="divider"></li>';
		
		foreach ($data as $key => $value) {
			$id = $id-1;
			foreach ($value as $key1 => $value1) {
				if ($key1 == "ID") {
					//id je id, dohromady je jich 13
					$id = $value1;
					echo "<div id='tr$id' class='w3-bar'>";
				}
			}
			foreach ($value as $key1 => $value1) {
				if ($key1 !== "user_id") {
					if ($key1 == "ID") {
						$id = $value1;
					}
					if ($key1 == "user_vote_id") {
						//this colors the upvotes and downvotes, depends on the plus or minus in database plus=green minus=red
						$status = "#039be5";
						$status1 = "#039be5";
						if (strpos($value1, "+".$_SESSION["user_id"].", ")) {
							$status="#00F20C;";
						} elseif (strpos($value1, "-".$_SESSION["user_id"].", ")){
							$status1="#FF0000";
						} else {
							$status = "#039be5";
							$status1 = "#039be5";
						}
						$find = $_SESSION["user_id"].", ";
						$pos = strpos($value1, $find);
					}
					if ($key1 == "user_vote_id"){	
					//counts manualy the substracted ammount of votes
						$data = Select("user_vote_id", "community", "ID", $id);
						$users_vote = $data[0]["user_vote_id"];
						$plus = substr_count($users_vote,"+");
						$minus = substr_count($users_vote,"-");
						$vote = 0 + $plus - $minus; 
						echo "<div class='w3-bar-item vote$id' style='width:50px'>$vote</div><div></div>";
					} elseif($key1 !== "vote") {
						if($key1 !== "ID"){
							if($key1 !== "type"){
								if($key1 == "czech"){
									echo "<div class='w3-bar' style='margin-left:30px'><h3 style='margin:0' class='comm'>$value1</h3></div>";
								} else{
									if($key1 == "japanese"){
										echo "<div class='w3-bar'><h3 style='margin:0' class='comm'><strong>$value1</strong></h3></div>";
									} else{
										echo "<div class='w3-bar'>$value1</div>";
									}
								}
							} else{
								echo "<div class='w3-bar'><div class='w3-bar-item w3-right'>$value1</div></div>";
							}
						}
					}
				}
			}
			//buttons for voting
			echo "<div class='w3-bar-item votes comm1' ><a href='' class='upvote' id='".$id."'><i style='color: $status' class='small material-icons' id='statusplus".$id."'>arrow_upward</i></a><a href='' class='downvote' id='".$id."'><i style='color: $status1' class='small material-icons' id='statusminus".$id."'>arrow_downward</i></a></div>";
			echo "</div><li class='divider'></li>";
		}
		echo '</div>';
	}

function Select($what, $from, $where, $where1){
	global $db;
	$data = array(
		':ID' => $where1
	);

	$sql="SELECT $what FROM $from WHERE $where = :ID";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
	return $data;
}


function votes(){
    global $db;
    $data = Select("user_vote_id", "community", "ID", $_POST["ID"]);
    $users_vote = $data[0]["user_vote_id"];
    $plus = substr_count($users_vote,"+");
    $minus = substr_count($users_vote,"-");
    $vote = $plus - $minus; 

    $data = array(
        ':doplnVote' => $vote,
        ':doplnID' => $_POST['ID']
    );
    $sql = "UPDATE community SET vote = :doplnVote WHERE ID = :doplnID"; //changes who voted
    $sqlProvedeni = $db -> prepare($sql);
    $stav = $sqlProvedeni->execute($data);
}

function complete(){
    global $db;
    $data = Select("vote", "community", "ID", $_POST["ID"]);
	$users_vote = $data[0]["vote"];
	
	if ($users_vote >= 10) {
		//uploads word from comunity to official list
		
		//checks if the word is already in database
		$data = Select("*", "community", "ID", $_POST["ID"]);
		$japanese = $data[0]["japanese"];
		$czech = $data[0]["czech"];
		$type = $data[0]["type"];
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
			
			$data = array(
				':doplnID' => $_POST['ID']
			);
			$sql = "DELETE FROM community WHERE ID = :doplnID"; //changes who voted
			$sqlProvedeni = $db -> prepare($sql);
			$stav = $sqlProvedeni->execute($data);
		} else {
			echo "Slovíčko už je v databázi";
		}
		//deletes uploaded word from database
	} elseif ($users_vote <= -10){
		echo "This word has been declined";
				
		$data = array(
			':doplnID' => $_POST['ID']
		);
		$sql = "DELETE FROM community WHERE ID = :doplnID"; //changes who voted
		$sqlProvedeni = $db -> prepare($sql);
		$stav = $sqlProvedeni->execute($data);
	}
}
?>