<?php
    function getSlovickaRequest() { // for getting techniques and word form MYSLQ || BIZA
        global $db;
        // getting techniques
        $sql = "SELECT * FROM `slovicka` INNER JOIN `techniky` ON slovicka.ID=techniky.ID;";  
        // getting words
        $sql1 = "SELECT * FROM `slovicka` WHERE type = 'word';";      
        $sqlProvedeni = $db->prepare($sql);
        $sqlProvedeni1 = $db->prepare($sql1);
        $stav = $sqlProvedeni->execute();
        $stav1 = $sqlProvedeni1->execute();
        $data1 = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);
        $data2 = $sqlProvedeni1->fetchAll(PDO::FETCH_ASSOC);        
        
        
        // combining arrays
        $data = array_merge($data1, $data2);
        return $data;
    }function getMetadataRequest() { // for getting metadata || BIZA
        global $db;        
        // getting metadata
        $sql = "SELECT * FROM `metadata`;";
        $sqlProvedeni = $db->prepare($sql);
        $stav = $sqlProvedeni->execute();
        $data = $sqlProvedeni->fetchAll(PDO::FETCH_ASSOC);       
        return $data;
    }
    

?>