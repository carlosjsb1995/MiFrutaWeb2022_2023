<?php
$usuario = $_POST['usuario'];

include '../../config/db.php';

  $sql = $mysqli->query(" SELECT * FROM parcelasdatos where usuario='".$usuario."' ");
  
  while($fech = $sql->fetch_object()){
      
          $terrenos[] = array("id"=> $fech->id,
          "parcela"=>$fech->parcela,
          "usuario"=>$fech->usuario,
          "variedad"=>$fech->variedad,
          "tamaño"=>$fech->tamaño
          ); 
  }

  $jsonTerrenos = json_encode($terrenos);

  $mysqli->close();

  echo $jsonTerrenos;
  
?>