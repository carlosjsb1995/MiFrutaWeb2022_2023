<?php

include '../../config/db.php';

    $res = $mysqli->query(" SELECT Distinct proveedor from albaran ");
    
    while($fech = $res->fetch_object()){
      
        $id[] = array(
        "id"=>$fech->proveedor
        ); 
}
$jsonPorv = json_encode($id);
$mysqli->close();

echo $jsonPorv;

?>