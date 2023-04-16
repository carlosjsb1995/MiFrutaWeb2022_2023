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

$res = $mysqli->query("UPDATE  usuario  SET usuario='".$usuario."', contrasena='".$cn."', rol='".$rol."' where usuario='".$usuario."'");
$res2 = $mysqli->query("UPDATE  datosusuarios SET  nombre='".$nombre."', apellido1='".$ape1."', apellido2='".$ape2."', 
telefono='".$telefono."', correo='".$correo."', DNI='".$DNI."' where usuario='".$usuario."'");

$mysqli->close();

echo $res;
echo $res2;

?>