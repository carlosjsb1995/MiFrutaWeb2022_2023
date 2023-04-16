<?php

include '../../config/db.php';

  //OBTENGO LAS ENTRADAS

  $sql = $mysqli->query(" SELECT DISTINCT variedad FROM parcelasdatos ");
  
  while($fech = $sql->fetch_object()){
      
          $variedades[] = array(
          "variedad"=>$fech->variedad
          ); 
  }

  $jsonVariedades = json_encode($variedades);

  $mysqli->close();

  echo $jsonVariedades;
  
?>