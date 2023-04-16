<?php

$id = $_POST['id'];

include '../../config/db.php';

    $res = $mysqli->query(" SELECT CASE
    WHEN linea IS NULL THEN 1
    ELSE max(linea)+1 end as linea  from albaranl where idAlbaran=".$id." ");
    
    while($fech = $res->fetch_object()){
      
        $lin[] = array(
        "linea"=>$fech->linea
        ); 
}
$jsonAlbaranes = json_encode($lin);
$mysqli->close();

echo $jsonAlbaranes;

?>