<?php
$usuario = $_POST['usuario'];


include '../../config/db.php';


  $sql = $mysqli->query(" SELECT albaran.id as id , idMaterial, cantidad, tipo FROM albaran
  inner join albaranl on albaran.id = albaranl.idAlbaran where proveedor='".$usuario."' ");
  
  while($fech = $sql->fetch_object()){
      
          $albaranes[] = array("id"=> $fech->id,
          "idMaterial"=>$fech->idMaterial,
          "cantidad"=>$fech->cantidad,
          "tipo"=>$fech->tipo,
          ); 
  }

  $jsonAlbaranes = json_encode($albaranes);

  $mysqli->close();

  echo $jsonAlbaranes;
  
?>