<?php
    if (!isset($_POST['check'])) { // checking if accesed by ajax, if not turn back on starting page || BIZA
        header('Location: ../index.php');   
    } else {
        include "../includer.php";
        // TODO check validation of sent data
        $data = array(
            ':UserID' => $_POST['UserID']           
        );
        //$sql = "INSERT INTO `UsertStitky` (`UserID`, `contains`) VALUES ( ".$data['UserID']." , '".$data['datasent']."') ON DUPLICATE KEY UPDATE contains='".$data['datasent']."'";
        $sql = "SELECT * FROM UsertStitky WHERE UserID = :UserID";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute($data);
        $data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    }



?>