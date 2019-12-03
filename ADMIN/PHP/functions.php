<?php
    function save_image($id, $file, $namese) {
        $directory_size = 20;
        $checker = $id / $directory_size;
        $checker = ceil($checker);
        $checker--;
        $movedir = "../img/";
        $movedir .= $checker."/";
        if (!file_exists($movedir)) {
            mkdir($movedir, 0777, true);
        }
        $name = $id.'.'. pathinfo($_FILES[$namese]['name'],PATHINFO_EXTENSION);
        /*echo $name;
        echo $file[$namese]['name']."<br>";
        echo $file[$namese]['tmp_name']."<br>";
        echo $file[$namese]['size']."<br>";
        echo $file[$namese]['error']."<br>";*/
        if (move_uploaded_file($file[$namese]['tmp_name'], $movedir.$name)) {
            $return = $checker . "/" . $name;
            return $return;
        } else {
            return 'nope';
        }
    }


?>