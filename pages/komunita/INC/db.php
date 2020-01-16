<?php
	define('DB_NAME', 'd231039_slovnik');
	define('DB_USER', 'w231039_slovnik');
	define('DB_PASSWORD', 'R*EAOUPAO7Z21@QLwLfKZL@9Jt@@j5');
	define('DB_HOST', 'md67.wedos.net');

	global $db;
    $db = new PDO(
            "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD,
            array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
            )
          );
?>
