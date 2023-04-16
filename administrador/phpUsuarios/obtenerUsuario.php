<?php

include '../../config/db.php';


			$res = $mysqli->query("select * from usuario INNER JOIN datosusuarios ON usuario.usuario = datosusuarios.usuario");
           
            
            while($f = $res->fetch_object()){
					
                if($f->usuario){

                $usuarios[] = array("usuario"=>$f->usuario,
                                    "rol"=>$f->rol,
                                    "nombre"=>$f->nombre,
                                    "apellido1"=>$f->apellido1,
                                    "apellido2"=>$f->apellido2,
                                    "telefono"=>$f->telefono,
                                    "correo"=>$f->correo,
                                    "dni"=>$f->dni,
                                    "cn"=>$f->contrasena
                                );
                } 
                    
            }

            $jsonUsuarios = json_encode($usuarios);
            $mysqli->close();

            echo $jsonUsuarios;


?>