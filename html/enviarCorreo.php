<?php
// El mensaje

$mensaje = $_POST['mensaje'];
$telefono = $_POST['telefono'];
$nombre = $_POST['nombre'];

$mensajeFinal = $mensaje;

// Si cualquier línea es más larga de 70 caracteres, se debería usar wordwrap()
$mensajeFinal = wordwrap($mensajeFinal, 70, "\r\n");
$titulo = ' NOMBRE:'.$nombre.' TELEFONO: '.$telefono;
// Enviarlo
mail('carlosjsb1995@gmail.com',$titulo, $mensajeFinal);

echo 'Email enviado con exito. Gracias por contactar con Stone Fruit SL';
header('Location:Contacto.html');

?>