<?php
$usuario = $_POST['usuario'];


include '../../config/db.php';

 $sql = $mysqli->query(" SELECT * FROM albaran where proveedor='".$usuario."' ");
  
  while($fech = $sql->fetch_object()){
      
          $albaranes[] = array("id"=> $fech->id,
          "proveedor"=>$fech->proveedor,
          "descripcion"=>$fech->descripcion,
          "fecha"=>$fech->fecha,
          "tipo"=>$fech->tipo,
          ); 
  }

  $jsonAlbaranes = json_encode($albaranes);

  $mysqli->close();

  echo $jsonAlbaranes;
  
?>