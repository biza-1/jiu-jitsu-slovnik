<?php
   
    /*if (!isset($_POST['check'])) { // checking if accesed by ajax, if not turn back on starting page || BIZA
        header('Location: ../index.php');        
    } else {*/
         // for loading images asynchrounously, so that SW saves them in dynamic cache (is called by AJAX)    
        $dir = "../images/images/";
        $files = scandir($dir, 0);
        $return = [];
        for($i = 2; $i < count($files); $i++){
            $return[] = 'images/images/'.$files[$i];
        }
        echo json_encode($return);
    //}
?>
