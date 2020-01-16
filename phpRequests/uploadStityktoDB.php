<?php
    if (!isset($_POST['check'])) { // checking if accesed by ajax, if not turn back on starting page || BIZA
        header('Location: ../index.php');   
    } else {
        include "../includer.php";
        // TODO check validation of sent data
        $data = array(
            ':UserID' => $_POST['userID'],
            ':datasent' => $_POST['data']
        );
        //$sql = "INSERT INTO `UsertStitky` (`UserID`, `contains`) VALUES ( ".$data['UserID']." , '".$data['datasent']."') ON DUPLICATE KEY UPDATE contains='".$data['datasent']."'";
        $sql = "INSERT INTO `UsertStitky` (`UserID`, `contains`) VALUES ( :UserID, :datasent) ON DUPLICATE KEY UPDATE contains= :datasent";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute($data);
        if ($stav) {
            echo "Všechny štítky byly úspěšně nahrány.";
        } else {
            echo "Jejda... štítky se nepodařilo nahrát, zkuste to prosím později.";
        }
    }



?>