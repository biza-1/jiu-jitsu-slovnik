<?php
session_id("test");
session_start();

include "../../INC/funtions.php";

if (!empty($_POST["sortBy"])) {
    View($_POST['sortBy'], $_POST['ascDESC']);
}

?>