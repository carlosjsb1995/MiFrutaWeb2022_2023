<?php

$idalbaran = $_POST['idalbaran'];
$fecha = $_POST['fecha'];
$tipo = $_POST['tipo'];
$prov = $_POST['prov'];
$desc= $_POST['desc'];

include '../../config/db.php';

$res = $mysqli->query("UPDATE albaran SET proveedor='".$prov."',descripcion='".$desc."', fecha='".$fecha."' , tipo='".$tipo."'
where id=".$idalbaran." ");

$mysqli->close();

echo $res;

?>