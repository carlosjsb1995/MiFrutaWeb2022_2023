<?php


$idAlbaran = $_POST['idAlbaran'];
$linea= $_POST['linea'];
$idMaterial = $_POST['idMaterial'];
$cantidd = $_POST['cantidad'];
$comentario = $_POST['comentario'];

include '../../config/db.php';


// Almacenamos primero los datos que se van a modificar Y ELIMINO

$res2 = $mysqli->query(" SELECT idMaterial,cantidad FROM albaranl where idAlbaran='".$idAlbaran."' and linea='".$linea."'");

while($fech = $res2->fetch_object()){
  
    $idMat[] = array(
    "idMaterial"=>$fech->idMaterial,
    "cantidad"=>$fech->cantidad
    ); 
}

$material = $idMat[0]["idMaterial"];
$cantidad = $idMat[0]["cantidad"];

$res2 = $mysqli->query(" SELECT tipo FROM albaran where id=".$idAlbaran."");

while($fech = $res2->fetch_object()){
  
    $lin[] = array(
    "tipo"=>$fech->tipo
    ); 
}


if($lin[0]["tipo"] == "ENTRADA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    -".$cantidad.",cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "SALIDA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$material.")
    +".$cantidad.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "ENTRADA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}

if($lin[0]["tipo"] == "SALIDA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadSalida=(SELECT cantidadSalida FROM materiales WHERE id=".$material.")
    -".$cantidad." WHERE id=".$material." ");

}


// ACTULIZAMOS EL ALBARAN

$res = $mysqli->query("UPDATE  albaranl SET  idMaterial='".$idMaterial."', cantidad='".$cantidd."', comentario='".$comentario."' 
 where idAlbaran='".$idAlbaran."' AND linea='".$linea."'");

//Una vez actulizado, lo añado

if($lin[0]["tipo"] == "ENTRADA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$idMaterial.")
    +".$cantidd.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    +".$cantidd." WHERE id=".$idMaterial." ");

}

if($lin[0]["tipo"] == "SALIDA"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales WHERE id=".$idMaterial.")
    -".$cantidd.", cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$material.")
    +".$cantidd." WHERE id=".$idMaterial." ");

}

if($lin[0]["tipo"] == "ENTRADA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadEntrada=(SELECT cantidadEntrada FROM materiales WHERE id=".$idMaterial.")
    +".$cantidd." WHERE id=".$idMaterial." ");

}

if($lin[0]["tipo"] == "SALIDA USUARIO"){

    $res3 = $mysqli->query("UPDATE materiales SET cantidadSalida=(SELECT cantidadSalida FROM materiales WHERE id=".$idMaterial.")
    +".$cantidd." WHERE id=".$idMaterial." ");

}


$mysqli->close();

echo $res;


?>