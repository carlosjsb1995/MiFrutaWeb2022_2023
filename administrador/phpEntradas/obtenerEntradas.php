<?php

//OBTENGO LAS ENTRADAS

include '../../config/db.php';

$res3 = $mysqli->query("SELECT entradas.id, parcelasdatos.id as idparcela, kilos,usuario,variedad,
parcelasdatos.parcela,fecha,inutiles,pequeñas,azucar,presion,calibremedio,porcentajeBueno,campana 
FROM entradas join parcelasdatos on entradas.idparcela=parcelasdatos.id order by fecha ");

while($f3 = $res3->fetch_object()){
    
        $entradas[] = array("id"=> $f3->id,
        "idparcela"=>$f3->idparcela,
        "kilos"=>$f3->kilos,
        "usuario"=>$f3->usuario,
        "variedad"=>$f3->variedad,
        "parcela"=>$f3->parcela,
        "fecha"=>$f3->fecha,
        "inutiles"=>$f3->inutiles,
        "pequeñas"=>$f3->pequeñas,
        "azucar"=>$f3->azucar,
        "presion"=>$f3->presion,
        "calibremedio"=> $f3->calibremedio,
        "porcentajeBueno"=>$f3->porcentajeBueno,
        "campana"=> $f3->campana); 
}

$jsonEntradas = json_encode($entradas);

$mysqli->close();
echo $jsonEntradas;

?>

