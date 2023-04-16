<?php


$id = $_POST['id'];
$kilos= $_POST['kilos'];
$fecha = $_POST['fecha'];
$inutiles = $_POST['inutiles'];
$peque = $_POST['peque'];

$azucar= $_POST['azucar'];
$presion = $_POST['presion'];
$calimed = $_POST['calimed'];


$total = 0;
$porcentaje = 0;

$total = $kilos - $inutiles - $peque;
$porcentaje = ($total * 100)/ $kilos;

$anio = substr ($fecha, 0, 4);

include '../../config/db.php';

$res = $mysqli->query("UPDATE  entradas SET  kilos='".$kilos."', fecha='".$fecha."', inutiles='".$inutiles."', 
pequeñas='".$peque."', azucar='".$azucar."', presion='".$presion."', calibremedio='".$calimed."', 
porcentajeBueno='".$porcentaje."', campana='".$anio."' where id='".$id."'");

$mysqli->close();

echo $res;


?>