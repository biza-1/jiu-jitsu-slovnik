<?php
    function getSlovickaRequest() { // for getting techniques and word form MYSLQ || BIZA
        global $db;
        // getting all by JOIN
        $sql = "SELECT slovicka.ID, slovicka.japanese, slovicka.czech, slovicka.type, techniky.imageUrl, slovicka.content FROM slovicka LEFT JOIN `techniky` ON slovicka.ID=techniky.ID ORDER By japanese ASC";
        //$sql = "SELECT * FROM `slovicka` INNER JOIN `techniky` ON slovicka.ID=techniky.ID;";  
        // getting words  
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute();
        $data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }function getMetadataRequest() { // for getting metadata || BIZA
        global $db;        
        // getting metadata
        $sql = "SELECT * FROM `metadata` WHERE type = 'technique';";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute();
        $data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);       
        return $data;
    }
    

?>