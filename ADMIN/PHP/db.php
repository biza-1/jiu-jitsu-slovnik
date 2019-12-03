<?php
    /*define('DB_NAME', 'jj_slovnik');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST', '127.0.0.1');

    global $db;
    $db = new PDO(
            "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD,
            array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET utf8"
            )
    );*/
    define('DB_NAME', 'd231039_slovnik');
	define('DB_USER', 'w231039_slovnik');
	define('DB_PASSWORD', 'cgHEP7eJlBHDPxcqMRtGyYlnkzTxEfhkJrhAcxZphY9LRSZFA0YTXqCBGrmSSb78E46rXwklxkQJE0XSL37MPzvdYq3R0CXb2mr@');
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