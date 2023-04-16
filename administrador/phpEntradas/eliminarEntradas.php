<?php

$id = $_POST['id'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM entradas where id='".$id."'");
   
    $mysqli->close();

    echo $res;

?>