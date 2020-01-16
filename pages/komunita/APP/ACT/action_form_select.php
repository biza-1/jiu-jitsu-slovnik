<?php
session_start();

include "../../INC/funtions.php";

$data = array(
 ':id' => $_POST["ID"]
);
$sql="SELECT * FROM community WHERE id = :id";
$sqlProvedeni = $db->prepare($sql);
$stav = $sqlProvedeni->execute($data);
$data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
if (!empty($data[0]['ID'])) {
    echo "<div class='w3-bar'><h3 style='margin:0'><strong>".$data[0]['japanese']."</strong></h3></div>";
    echo "<div class='w3-bar' style='margin-left:30px'><h3 style='margin:0'>".$data[0]['czech']."</h3></div>";
    echo "<div class='w3-bar'><div class='w3-bar-item w3-right'>".$data[0]['type']."</div></div>";
    $status = "#039be5";
    $status1 = "#039be5";
    if (strpos($data[0]['user_vote_id'], "+".$_SESSION["user_id"].", ")) {
        $status="#00F20C;";
    } elseif (strpos($data[0]['user_vote_id'], "-".$_SESSION["user_id"].", ")){
        $status1="#FF0000";
    } else {
        $status = "#039be5";
        $status1 = "#039be5";
    }
    echo "<div class='w3-bar-item' style='width:50px'>".$data[0]['vote']."</div>";
    echo "<div class='w3-bar-item votes' ><a href='' class='upvote' id='".$_POST['ID']."'><i style='color: $status' class='small material-icons' id='statusplus".$_POST['ID']."'>arrow_upward</i></a><a href='' class='downvote' id='".$_POST['ID']."'><i style='color: $status1' class='small material-icons' id='statusminus".$_POST['ID']."'>arrow_downward</i></a></div></div>";
    
} else {
    echo "";
}
?>