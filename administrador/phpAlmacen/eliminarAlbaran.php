<?php

$id = $_POST['id'];

include '../../config/db.php';

//Primero eliminamos los valores de las lineas del albaran en materiales y el tipo
$res2 = $mysqli->query(" SELECT idMaterial,cantidad FROM albaranl where idAlbaran='".$id."'");

while($fech = $res2->fetch_object()){
  
    $idMat[] = array(
    "idMaterial"=>$fech->idMaterial,
    "cantidad"=>$fech->cantidad
    ); 
}

$res2 = $mysqli->query(" SELECT tipo FROM albaran where id=".$id.""); 

while($fech = $res2->fetch_object()){
  
    $lin[] = array(
    "tipo"=>$fech->tipo
    ); 
}

//Recorro el array y voy actulizando la tabla materiales.

for ($i = 0; $i < sizeof($idMat); $i++) {
    
    if($lin[0]["tipo"] == "ENTRADA"){

        $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales 
        WHERE id=".$idMat[$i]["idMaterial"].")
        -".$idMat[$i]["cantidad"]." WHERE id=".$idMat[$i]["idMaterial"]." ");
    
    }
    
    if($lin[0]["tipo"] == "SALIDA"){
    
        $res3 = $mysqli->query("UPDATE materiales SET cantidadTotal=(SELECT cantidadTotal FROM materiales
         WHERE id=".$idMat[$i]["idMaterial"].")
        +".$idMat[$i]["cantidad"]." WHERE id=".$idMat[$i]["idMaterial"]." ");
    
    }
    
    if($lin[0]["tipo"] == "ENTRADA USUARIO"){
    
        $res3 = $mysqli->query("UPDATE materiales SET cantidadEntrada=(SELECT cantidadEntrada FROM materiales 
        WHERE id=".$idMat[$i]["idMaterial"].")
        -".$idMat[$i]["cantidad"]." WHERE id=".$idMat[$i]["idMaterial"]." ");
    
    }
    
    if($lin[0]["tipo"] == "SALIDA USUARIO"){
    
        $res3 = $mysqli->query("UPDATE materiales SET cantidadSalida=(SELECT cantidadSalida FROM materiales 
        WHERE id=".$idMat[$i]["idMaterial"].")
        -".$idMat[$i]["cantidad"]." WHERE id=".$idMat[$i]["idMaterial"]." ");
    
    }
}

//Elimino el albaran, y automaticamente se elimina las lineas tambien.
    $res = $mysqli->query("DELETE FROM albaran where id='".$id."' ");
    
    $mysqli->close();

    echo $res;

?>