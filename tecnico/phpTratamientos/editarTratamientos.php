<?php

$localizacion = $_POST['localizacion'];
$fecha= $_POST['fecha'];
$tipo = $_POST['tipo'];
$compu = $_POST['compu'];
$est = $_POST['est'];
$comentario = $_POST['comentario'];

include '../../config/db.php';

$res = $mysqli->query("UPDATE  tratamientos SET  tipo='".$tipo."', compuesto='".$compu."', estado='".$est."', comentario='".$comentario."' 
 where localizacion='".$localizacion."' and fecha='".$fecha."' ");

$mysqli->close();

echo $res;

?>