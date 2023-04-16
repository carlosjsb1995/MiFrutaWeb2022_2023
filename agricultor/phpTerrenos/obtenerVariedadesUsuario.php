<?php
$usuario = $_POST['usuario'];


include '../../config/db.php';

  $sql = $mysqli->query(" SELECT DISTINCT variedad FROM parcelasdatos where usuario='".$usuario."' ");
  
  while($fech = $sql->fetch_object()){
      
          $variedades[] = array(
          "variedad"=>$fech->variedad
          ); 
  }

  $jsonVariedades = json_encode($variedades);

  $mysqli->close();

  echo $jsonVariedades;

?>