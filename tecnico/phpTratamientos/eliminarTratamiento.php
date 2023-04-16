<?php

$id = $_POST['id'];
$fecha = $_POST['fecha'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM tratamientos where localizacion='".$id."' and fecha='".$fecha."' ");
   
    $mysqli->close();

    echo $res;

?>