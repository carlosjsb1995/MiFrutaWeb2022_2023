<?php

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$desc= $_POST['desc'];

include '../../config/db.php';

$res = $mysqli->query("UPDATE materiales SET nombre='".$nombre."',descripcion='".$desc."'
where id=".$id." ");

$mysqli->close();

echo $res;

?>