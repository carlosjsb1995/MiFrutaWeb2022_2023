<?php


$nombre = $_POST['nombre'];
$ape1= $_POST['ape1'];
$ape2 = $_POST['ape2'];
$usuario = $_POST['usuario'];
$cn = $_POST['cn'];

$rol= $_POST['rol'];
$DNI = $_POST['DNI'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO usuario (usuario, contrasena, rol) VALUES ('".$usuario."','".$cn."', '".$rol."')");
$res2 = $mysqli->query("INSERT INTO datosusuarios (usuario, nombre, apellido1, apellido2, telefono, correo, dni) 
VALUES ('".$usuario."','".$nombre."', '".$ape1."','".$ape2."','".$telefono."','".$correo."','".$DNI."')");

$mysqli->close();

echo $res;
echo $res2;

?>