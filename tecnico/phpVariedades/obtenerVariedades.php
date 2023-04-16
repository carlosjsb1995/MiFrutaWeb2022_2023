<?php

include '../../config/db.php';

  $sql = $mysqli->query(" SELECT * FROM variedades ");
  
  while($fech = $sql->fetch_object()){
      
          $variedades[] = array("nombre"=> $fech->nombre,
          "tipo"=>$fech->tipo,
          "colorExterior"=>$fech->colorExterior,
          "colorInterior"=>$fech->colorInterior,
          "calibreMedio"=>$fech->calibreMedio,
          ); 
  }

  $jsonVariedades = json_encode($variedades);

  $mysqli->close();

  echo $jsonVariedades;
  
?>