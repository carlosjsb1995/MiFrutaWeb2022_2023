<?php

$id = $_POST['id'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM materiales where id='".$id."' ");
    
    $mysqli->close();

    echo $res;

?>