<?php // getting slovicka from MYSQL || BIZA
    if (!isset($_POST['check'])) { // checking if accesed by ajax, if not turn back on starting page 
        header('Location: ../index.php');        
    } else {
        include "../includer.php";
        // getting data
        $sql = "SELECT * FROM `slovicka`";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute();
        $data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
        // returning response in JSON
        echo json_encode($data);
    }
    
?>
