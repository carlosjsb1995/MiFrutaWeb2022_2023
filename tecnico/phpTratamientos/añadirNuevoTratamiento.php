<?php

$fecha = $_POST['fecha'];
$tipo= $_POST['tipo'];
$compuesto = $_POST['compuesto'];
$estado = $_POST['estado'];
$localizacion = $_POST['localizacion'];
$comentario = $_POST['comentario'];

include '../../config/db.php';

$res = $mysqli->query(" INSERT INTO tratamientos (localizacion, fecha, tipo, compuesto, estado, comentario) VALUES 
 ('".$localizacion."','".$fecha."', '".$tipo."','".$compuesto."','".$estado."','".$comentario."')");

$mysqli->close();

echo $res;

?>