<?php

$nombre = $_POST['nombre'];
$tipo= $_POST['tipo'];
$ce = $_POST['ce'];
$ci = $_POST['ci'];
$cm = $_POST['cm'];

include '../../config/db.php';

$res = $mysqli->query("UPDATE  variedades SET  tipo='".$tipo."', colorExterior='".$ce."', colorInterior='".$ci."', 
calibreMedio='".$cm."' where nombre='".$nombre."'");

$mysqli->close();

echo $res;

?>