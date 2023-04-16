<?php

$id = $_POST['id'];
$parcela= $_POST['parcela'];
$variedad = $_POST['variedad'];
$agri = $_POST['agri'];
$tam = $_POST['tam'];

include '../../config/db.php';

$res = $mysqli->query("UPDATE  parcelasdatos SET  variedad='".$variedad."', usuario='".$agri."', tamaño='".$tam."'
 where id='".$id."' and parcela='".$parcela."' ");

$mysqli->close();

echo $res;

?>