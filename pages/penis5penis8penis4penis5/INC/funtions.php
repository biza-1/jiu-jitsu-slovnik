<?php
  include "db.php";

function getID ($select, $from, $where, $dopln, $what){
	global $db;

	$data = array(":dopln$dopln" => $what);
	$sql="SELECT $select FROM $from WHERE $where = :dopln$dopln";
	$sqlProvedeni = $db->prepare($sql);
	$stav = $sqlProvedeni->execute($data);
	$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);

	if (count($data) == 1) {
		$return = $data["0"]["$select"];
		return $return;
	} else {
		return "false";
	}
}

function INS_POST($japan, $czech, $type, $user_id){
	global $db;

	//UKLADANI DO POST
	$sql = "INSERT INTO community (japanese, czech, type, user_id, vote) VALUES (:doplnJAP, :doplnCZ, :doplnTYPE, :doplnUSER, :doplnVOTE)";
	$data = array(
		':doplnJAP' => $japan,
		':doplnCZ' => $czech,
		':doplnTYPE' => $type,
		':doplnUSER' => $user_id,
		':doplnVOTE' => "0"
	);
	$sqlProvedeni = $db -> prepare($sql);
	$stav = $sqlProvedeni->execute($data);
}

function View($orderby, $ASC){ // ukaze data  |x| CECH 
	global $db;

		$sql="SELECT * FROM community ORDER BY $orderby $ASC";
		$sqlProvedeni = $db->prepare($sql);
		$stav = $sqlProvedeni->execute();
		$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);


		echo "
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Jap</th>
						<th>Czech</th>
						<th>type</th>
						<th>user</th>
						<th>vote</th>
						<th></th>
					</tr>
				</thead>
				<tbody>";

		$i=count($data);
		
		foreach ($data as $key => $value) {
			echo "<tr>";
			foreach ($value as $key1 => $value1) {
				if ($key1 == "ID") {
					$penis = $value1;
				}
				if ($key1 == "user_vote_id") {
					
					$status = "#091be5";
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
					$data = Select("user_vote_id", "community", "ID", $penis);
					$users_vote = $data[0]["user_vote_id"];
					$plus = substr_count($users_vote,"+");
					$minus = substr_count($users_vote,"-");
					$vote = 0 + $plus - $minus; 
					echo "<td class='vote$penis'>$vote</td>";
				} elseif($key1 !== "vote") {
					echo "<td>$value1</td>";
				}
			}
			echo "<td class='votes'><a href='' class='upvote' id='".$penis."'><i style='color: $status' class='small material-icons' id='statusplus".$penis."'>arrow_upward</i></a><a href='' class='downvote' id='".$penis."'><i style='color: $status1' class='small material-icons' id='statusminus".$penis."'>arrow_downward</i></a></td>";
			echo "</tr>";
			echo "<br>";
		}
		echo "
				</tbody>
			</table>";
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
?>
