<?php
session_start();
include "../../INC/funtions.php";

//if the user isnt logged in, cannot vote
if (!empty($_SESSION["user_id"])) { //user cannot vote unless he is logged in
    if ($_POST["vote"] == "upvote") { // if user up votes >

        $data = Select("user_vote_id", "community", "ID", $_POST["ID"]); 
        $users_vote = $data[0]["user_vote_id"];
        
        $find = $_SESSION["user_id"];
        $pos = strpos($users_vote, $find);

        $find1 = "-".$_SESSION["user_id"].", ";
        $find2 = "+".$_SESSION["user_id"].", ";

        if (strpos($users_vote,$find2) == TRUE) {
            $replace = "";
            $new = str_replace("+".$_SESSION["user_id"].", ", $replace, $data[0]["user_vote_id"]); 

            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }

        if (strpos($users_vote,$find1) == TRUE) {
            $replace = "+".$_SESSION["user_id"].", ";
            $new = str_replace("-".$_SESSION["user_id"].", ", $replace, $data[0]["user_vote_id"]); 

            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }
        if (strpos($users_vote,$find2) == FALSE AND strpos($users_vote,$find1) == FALSE) { // if it doesnt find any vote by the logged in user it updates the database and inserts new vote
    // Zmeni stav vote podle toho co uzivatel zadal v tomto pripade +1
            $data = Select("user_vote_id", "community", "ID", $_POST["ID"]);
            
            $new = $data[0]["user_vote_id"]."+".$_SESSION["user_id"].", ";
            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }
    } else {
        $data = Select("user_vote_id", "community", "ID", $_POST["ID"]);
        $users_vote = $data[0]["user_vote_id"];
        
        $find = $_SESSION["user_id"];
        
        $find1 = "+".$_SESSION["user_id"].", ";
        $find2 = "-".$_SESSION["user_id"].", ";
        $pos = strpos($users_vote, $find);

        if (strpos($users_vote,$find2) == TRUE) {
            $replace = "";
            $new = str_replace("-".$_SESSION["user_id"].", ", $replace, $data[0]["user_vote_id"]); 

            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }

        if (strpos($users_vote,$find1) == TRUE) {
            $replace = "-".$_SESSION["user_id"].", ";
            $new = str_replace("+".$_SESSION["user_id"].", ", $replace, $data[0]["user_vote_id"]); 

            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }

        if (strpos($users_vote,$find2) == FALSE AND strpos($users_vote,$find1) == FALSE) { // if it doesnt find any vote by the logged in user it updates the database and inserts new vote
    // Zmeni stav vote podle toho co uzivatel zadal v tomto pripade +1
            $data = Select("user_vote_id", "community", "ID", $_POST["ID"]);
            
            $new = $data[0]["user_vote_id"]."-".$_SESSION["user_id"].", ";
            $data = array(
                ':doplnVoteID' => $new,
                ':doplnID' => $_POST['ID']
            );
            $sql = "UPDATE community SET user_vote_id = :doplnVoteID WHERE ID = :doplnID"; //changes who voted
            $sqlProvedeni = $db -> prepare($sql);
            $stav = $sqlProvedeni->execute($data);
            votes();
            complete();
        }
    }
} else { 
    echo 'prihlaseni';
}

    
?>