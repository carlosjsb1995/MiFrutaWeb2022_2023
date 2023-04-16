<?php

include '../../config/db.php';

    $res = $mysqli->query(" SELECT * FROM materiales ");
    
    while($fech = $res->fetch_object()){
      
        $id[] = array(
        "id"=>$fech->id,
        "nombre"=>$fech->nombre,
        "descripcion"=>$fech->descripcion,
        "cantidadTotal"=>$fech->cantidadTotal,
        "cantidadEntrada"=>$fech->cantidadEntrada,
        "cantidadSalida"=>$fech->cantidadSalida
        ); 
}

$jsonMateriales = json_encode($id);
$mysqli->close();

echo $jsonMateriales;

?>