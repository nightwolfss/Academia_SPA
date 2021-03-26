<?php
try {
    $pdo = new PDO("mysql:dbname=registros;host=127.0.0.1","root","12345");
} catch (PDOException $e) {
    echo "Error: ".$e->getMessage();
}
