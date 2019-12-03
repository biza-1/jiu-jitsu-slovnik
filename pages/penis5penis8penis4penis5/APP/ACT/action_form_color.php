<?php
session_id("test");
session_start();

include "../../INC/funtions.php";


$data = Select("user_vote_id", "community", "ID", $_POST["ID"]);
$data = $data[0]["user_vote_id"];


if ($_POST["vote"] == "downvote") {
    //if the person is voting for the first time it will change the values of color
    if (strpos($data,"-".$_SESSION["user_id"].", ") == TRUE) {
        echo "#FF0000";
    }else{
    //but if the person already voted and wants to remove their vote, this will change the color back to normal
        echo '#039be5';
    }
}

if ($_POST["vote"] == "upvote") {
    //if the person is voting for the first time it will change the values of color
    if (strpos($data,"+".$_SESSION["user_id"].", ") == TRUE) {
        echo "#00F20C";
    }else{
        //but if the person already voted and wants to remove their vote, this will change the color back to normal
        echo '#039be5';
    }
}
?>