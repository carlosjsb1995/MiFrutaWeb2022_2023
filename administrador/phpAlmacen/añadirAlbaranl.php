<?php

$idalbaran = $_POST['idalbaran'];
$linea = $_POST['linea'];
$material = $_POST['material'];
$cantidad = $_POST['cantidad'];
$comentario= $_POST['comentario'];

include '../../config/db.php';

$res = $mysqli->query("INSERT INTO albaranl (idAlbaran, idMaterial, cantidad, comentario, linea) 
VALUES (".$idalbaran.",'".$material."', ".$cantidad.",'".$comentario."',".$linea.")");

//Actulizamos los materiales

$res2 = $mysqli->query(" SELECT tipo FROM albaran where id=".$idalbaran."");

while($fech = $res2->fetch_object()){
  
    $lin[] = array(
    "tipo"=>$fech->tipo
    ); 
}


if($lin[0]["tipo"] == "ENTRADA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    +".$cantidad.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    +".$cantidad."  WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "SALIDA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    -".$cantidad.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "ENTRADA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    +".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "SALIDA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadSalida=(SELECT cantidadSalida FROM materiales WHERE id=".$material.")
    +".$cantidad." WHERE id=".$material." ");

}

$mysqli->close();

echo $res;

?>