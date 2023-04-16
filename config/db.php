<?php 
/*$host="localhost";
$bd="mifruta";
$usuario="root";
$contrasenia="";

try {
        $conexion=new PDO("mysql:host=$host;dbname=$bd",$usuario,$contrasenia); 
        
} catch ( Exception $ex) {

    echo $ex->getMessage();
}*/


$mysqli = new mysqli('localhost', 'root', '', 'mifruta');
$mysqli->set_charset("utf8");

?>