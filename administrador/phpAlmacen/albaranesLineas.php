<?php

include '../../config/db.php';

  $sql = $mysqli->query(" SELECT * FROM albaranl
  join materiales on albaranl.idMaterial = materiales.id order by idAlbaran,linea asc ");
  
  while($fech = $sql->fetch_object()){
      
          $albaranes[] = array("idAlbaran"=> $fech->idAlbaran,
          "idMaterial"=>$fech->idMaterial,
          "cantidad" => $fech->cantidad,
          "comentario"=>$fech->comentario,
          "nombre"=>$fech->nombre,
          "descripcion"=>$fech->descripcion,
          "linea"=>$fech->linea
          ); 
  }

  $jsonAlbaranes = json_encode($albaranes);

  $mysqli->close();

  echo $jsonAlbaranes;
  
?>