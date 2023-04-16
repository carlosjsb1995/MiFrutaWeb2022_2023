<?php

include '../../config/db.php';

    $res = $mysqli->query(" SELECT ano FROM campana ");
    
    while($fech = $res->fetch_object()){
      
        $id[] = array(
        "ano"=>$fech->ano
        ); 
}

$jsonCamp = json_encode($id);
$mysqli->close();

echo $jsonCamp;

?>