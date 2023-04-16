<?php

$nombre = $_POST['nombre'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM variedades where nombre='".$nombre."'");
   
    $mysqli->close();

    echo $res;

?>