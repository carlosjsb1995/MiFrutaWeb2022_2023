<?php

$id = $_POST['id'];
$linea = $_POST['linea'];


include '../../config/db.php';


    $res = $mysqli->query("SELECT * FROM albaranl
    join materiales on albaranl.idMaterial=materiales.id 
    where albaranl.idAlbaran='".$id."' and albaranl.linea='".$linea."'");
    
    while($fech = $res->fetch_object()){
      
        $albaranes[] = array("idAlbaran"=> $fech->idAlbaran,
        "idMaterial"=>$fech->idMaterial,
        "cantidad" => $fech->cantidad,
        "comentario"=>$fech->comentario,
        "linea"=>$fech->linea,
        "nombre"=>$fech->nombre
        ); 
}

$jsonAlbaranes = json_encode($albaranes);

$mysqli->close();

echo $jsonAlbaranes;

?>