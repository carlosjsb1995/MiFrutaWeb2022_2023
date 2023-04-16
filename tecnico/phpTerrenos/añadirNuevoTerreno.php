<?php

$parcela = $_POST['parcela'];
$agricultor= $_POST['agricultor'];
$variedad = $_POST['variedad'];
$tamaño = $_POST['tamaño'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO parcelasdatos (id, parcela, usuario, variedad, tamaño) 
VALUES (NULL,'".$parcela."', '".$agricultor."','".$variedad."','".$tamaño."')");

$mysqli->close();

echo $res;

?>