<?php

include '../../config/db.php';

    $res = $mysqli->query(" SELECT usuario from usuario where rol='agricultor' ");
    
    while($fech = $res->fetch_object()){
      
        $id[] = array(
        "id"=>$fech->usuario
        ); 
}

$jsonAlbaranes = json_encode($id);
$mysqli->close();

echo $jsonAlbaranes;

?>