<?php
$nombre = $_POST['nombre'];
$desc= $_POST['desc'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO materiales(id, nombre, descripcion, cantidadTotal,cantidadEntrada, cantidadSalida) VALUES
 (null,'".$nombre."', '".$desc."',0,0,0)");

$mysqli->close();

echo $res;

?>