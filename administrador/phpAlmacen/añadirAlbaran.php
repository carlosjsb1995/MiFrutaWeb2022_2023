<?php

$idalbaran = $_POST['idalbaran'];
$fecha = $_POST['fecha'];
$tipo = $_POST['tipo'];
$prov = $_POST['prov'];
$desc= $_POST['desc'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO albaran (id, proveedor, descripcion, fecha, tipo)
VALUES ('".$idalbaran."','".$prov."', '".$desc."','".$fecha."','".$tipo."')");

$mysqli->close();

echo $res;

?>