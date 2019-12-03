<?php
session_id("test");
session_start();
include "../../INC/funtions.php";
foreach ($_POST as $key => $value) {
    if (empty($value)) {
        $empty = 1;
    }
}
if (!isset($empty)) {
    $sql = "INSERT INTO community (japanese, czech, type, user_id, vote) VALUES (:doplnJAP, :doplnCZ, :doplnTYPE, :doplnUSER, :doplnVOTE)";
    $data = array(
        ':doplnJAP' => $_POST["jap"],
        ':doplnCZ' => $_POST["cze"],
        ':doplnTYPE' => $_POST["type"],
        ':doplnUSER' => $_SESSION["user_id"],
        ':doplnVOTE' => "0, "
    );
    $sqlProvedeni = $db -> prepare($sql);
    $stav = $sqlProvedeni->execute($data);
}

header("location:../../index.php");
?>