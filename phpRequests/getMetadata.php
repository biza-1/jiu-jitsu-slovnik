<?php
    if (!isset($_POST['check'])) { // checking if accesed by ajax, if not turn back on starting page || BIZA
        header('Location: ../index.php');        
    } else {
        include "../includer.php";
        // getting data
        $data = getMetadataRequest();
        // returning response in JSON
        echo json_encode($data);
    }


?>