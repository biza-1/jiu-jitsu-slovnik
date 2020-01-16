<?php
session_start();
include "../../INC/funtions.php";
foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $empty = 1;
    }
    $_POST["$key"] = htmlspecialchars("$_POST[$key]");
}
if (!isset($empty)) {
    $sql = "INSERT INTO community (japanese, czech, type, user_id, vote, user_vote_id) VALUES (:doplnJAP, :doplnCZ, :doplnTYPE, :doplnUSER, :doplnVOTE, :doplnVOTEID)";
    $data = array(
        ':doplnJAP' => $_POST["jap"],
        ':doplnCZ' => $_POST["cze"],
        ':doplnTYPE' => "slovíčko",
        ':doplnUSER' => $_SESSION["user_id"],
        ':doplnVOTE' => "0",
        ':doplnVOTEID' => "0, "
    );
    $sqlProvedeni = $db -> prepare($sql);
    $stav = $sqlProvedeni->execute($data);
}

header("location:../../index.php");
?>