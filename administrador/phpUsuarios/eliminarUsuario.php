<?php


$usuario = $_POST['usuario'];

include '../../config/db.php';

    $res = $mysqli->query("DELETE FROM datosusuarios where usuario='".$usuario."'");
    $res2 = $mysqli->query("DELETE FROM usuario where usuario='".$usuario."'");


    $mysqli->close();

    echo $res;
    echo $res2;

?>