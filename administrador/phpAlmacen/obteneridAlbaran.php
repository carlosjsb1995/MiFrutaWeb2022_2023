<?php


include '../../config/db.php';

    $res = $mysqli->query(" SELECT MAX(id)+1 as nalbaran FROM albaran ");
    
    while($fech = $res->fetch_object()){
      
        $id[] = array(
        "id"=>$fech->nalbaran
        ); 
}
$jsonAlbaranes = json_encode($id);
$mysqli->close();

echo $jsonAlbaranes;

?>