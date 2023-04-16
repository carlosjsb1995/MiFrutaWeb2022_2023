<?php

$id = $_POST['id'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM parcelasdatos where id='".$id."'");
   
    $mysqli->close();

    echo $res;

?>