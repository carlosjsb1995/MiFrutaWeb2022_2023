<?php

$id = $_POST['id'];
$linea = $_POST['linea'];


include '../../config/db.php';

// Selecionamos primero el idmaterial


$res2 = $mysqli->query(" SELECT idMaterial,cantidad FROM albaranl where idAlbaran='".$id."' and linea='".$linea."'");

while($fech = $res2->fetch_object()){
  
    $idMat[] = array(
    "idMaterial"=>$fech->idMaterial,
    "cantidad"=>$fech->cantidad
    ); 
}

$material = $idMat[0]["idMaterial"];
$cantidad = $idMat[0]["cantidad"];

$res = $mysqli->query("DELETE FROM albaranl where idAlbaran='".$id."' and linea='".$linea."'");

//Actulizamos los materiales

$res2 = $mysqli->query(" SELECT tipo FROM albaran where id=".$id."");

while($fech = $res2->fetch_object()){
  
    $lin[] = array(
    "tipo"=>$fech->tipo
    ); 
}

if($lin[0]["tipo"] == "ENTRADA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    -".$cantidad.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");
    
}

if($lin[0]["tipo"] == "SALIDA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    +".$cantidad.". cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    +".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "ENTRADA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "SALIDA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadSalida=(SELECT cantidadSalida FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}
    $mysqli->close();

    echo $res;

?>