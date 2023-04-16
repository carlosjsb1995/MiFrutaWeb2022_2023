<?php

$nombre = $_POST['nombre'];
$tipo= $_POST['tipo'];
$ce = $_POST['ce'];
$ci = $_POST['ci'];
$cm = $_POST['cm'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO variedades ( nombre, tipo, colorExterior, colorInterior, calibreMedio)
VALUES ('".$nombre."','".$tipo."', '".$ce."','".$ci."','".$cm."')");

$mysqli->close();

echo $res;

?>