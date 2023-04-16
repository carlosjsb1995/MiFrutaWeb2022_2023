<?php

include '../../config/db.php';

$res = $mysqli->query("SELECT * FROM parcelasdatos");

while($f = $res->fetch_object()){
					
    if($f->usuario){

    $parcelas[] = array("id"=>$f->id,
                        "parcela"=>$f->parcela,
                        "tamaño"=>$f->tamaño,
                        "usuario"=>$f->usuario,
                        "variedad"=>$f->variedad
                       
                    );
    } 
        
}

$jsonParcelas = json_encode($parcelas);

$mysqli->close();

echo $jsonParcelas;


?>