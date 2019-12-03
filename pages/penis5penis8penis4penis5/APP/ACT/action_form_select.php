<?php
session_id("test");
session_start();

include "../../INC/funtions.php";

$data = array(
 ':id' => $_POST["ID"]
);
$sql="SELECT user_vote_id FROM community WHERE id = :id";
$sqlProvedeni = $db->prepare($sql);
$stav = $sqlProvedeni->execute($data);
$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);



foreach ($data as $key => $value) {
    foreach ($value as $key1 => $value1) {
        //counts the ammount of votes by counting all pluses and minuses in database and then subtracts
        $plus = substr_count($value1,"+");
        $minus = substr_count($value1,"-");
        $vote = $plus - $minus;
        echo $vote;
    }
}
?>