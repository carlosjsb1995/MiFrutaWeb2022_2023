<?php

include '../../config/db.php';

  $sql = $mysqli->query(" SELECT * FROM tratamientos
  join parcelasdatos on tratamientos.localizacion = parcelasdatos.id  ");
  
  while($fech = $sql->fetch_object()){
      
          $tratamientos[] = array("localizacion"=> $fech->localizacion,
          "parcela"=>$fech->parcela,
          "variedad"=>$fech->variedad,
          "fecha"=>$fech->fecha,
          "tipo"=>$fech->tipo,
          "compuesto"=>$fech->compuesto,
          "estado"=>$fech->estado,
          "comentario"=>$fech->comentario
          ); 
  }

  $jsonTratamientos = json_encode($tratamientos);

  $mysqli->close();

  echo $jsonTratamientos;
  
?>