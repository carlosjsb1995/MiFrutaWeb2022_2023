<?php

include '../../config/db.php';

    $res = $mysqli->query("SELECT * FROM  materiales ");
    
    while($fech = $res->fetch_object()){
      
        $materiales[] = array(
        "id"=>$fech->id,
        "nombre"=>$fech->nombre
        ); 
}

$jsonMateriales = json_encode($materiales);

$mysqli->close();

echo $jsonMateriales;

?>