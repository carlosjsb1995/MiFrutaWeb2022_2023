<?php

$parcela = $_POST['parcela'];
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

$res = $mysqli->query("INSERT INTO entradas ( idparcela, kilos, fecha, inutiles, pequeñas, azucar, presion, calibremedio, porcentajeBueno, campana)
VALUES ('".$parcela."','".$kilos."', '".$fecha."','".$inutiles."','".$peque."','".$azucar."','".$presion."','".$calimed."','".$porcentaje."','".$anio."')");

$mysqli->close();

echo $res;

?>