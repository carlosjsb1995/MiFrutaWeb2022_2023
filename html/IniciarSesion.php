
<?php 
session_start();

$txtUsuario=(isset($_POST['usuario']))?$_POST['usuario']:"";
$txtContrasena=(isset($_POST['contrasenia']))?$_POST['contrasenia']:"";
$accion=(isset($_POST['accion']))?$_POST['accion']:"";


switch($accion){
	case "Login":
			
		include '../config/db.php';

			$res = $mysqli->query("SELECT * FROM usuario where usuario='".$txtUsuario."' AND contrasena='".$txtContrasena."'");
		
			$row_cnt = $res->num_rows;

			if($row_cnt == 0){
				$mensaje="Error: El usuario o contraseña son incorrectos";
			}else{
				while($f = $res->fetch_object()){
					
						if($f->rol){
						
						$_SESSION['rol']=$f->rol;
						$_SESSION['nombre']=$f->usuario;
						$mysqli->close();
					 	header('Location:../'.$f->rol.'/index.php');
						} 
							
				}
				
			}
			
        break; 
}    

    

?>


<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>StoneFruit</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	
	
</head>
<body style="background: #f3f3f3;">
	<!-- .navbar-expand-lg	Sirve para indicar en que punto aparecera el toggler -->
	<!-- .navbar-light 		Indicamos que usaremos un fondo claro -->
	<!-- .navbar-dark 		Indicamos que usaremos un fondo oscuro -->
	<!-- .bg-light 			Establecemos un fondo light para el navbar -->
	<!-- Tambien podemos darle nuestro propio color de fondo con CSS -->

	<!-- .fixed-top 		Nos permite fijar el menu en la parte superior -->
	<!-- .fixed-bottom 		Nos permite fijar el menu en la parte inferior -->
	
	
<!-- EL NAV FUERA DEL CONTAINER PARA QUE AVARQUE EL 100%; -->
<style>
	.marginz{
		
		margin-bottom: 30px;
	}
</style>

<nav class=" marginz navbar navbar-expand-md navbar-dark bg-dark ">
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
		</button>
		
		<!-- Brand -->
		<img src="../img/logo2.png">
		<style>
			.dark{
				background-color: 	#292b2c;
				color : rgb(131, 133, 133);
			};
		</style>
		<!-- Links -->
		<div class="collapse navbar-collapse justify-content-end" id="nav-content">   
		<ul class="navbar-nav">
		<li class="nav-item">
		<a class="nav-link" href="../index.html">¿Quienes somos?</a>
		</li>
		<div>
		<li class="nav-item dropdown ">
						<a href="#" class="nav-link dropdown-toggle" id="menu-categorias" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Variedades
						</a>
						<div class="dropdown-menu dark" aria-labelledby="menu-categorias">
							<a href="Melocoton.html" class="dropdown-item dark">Melocoton</a>
							<a href="Nectarina.html" class="dropdown-item dark">Nectarina</a>
							<a href="Ciruela.html" class="dropdown-item dark">Ciruela</a>
						</div>
		</li>
		</div>
		<li class="nav-item">
		<a class="nav-link" href="Contacto.html">Contacto</a>
		</li>
		<li class="nav-item">
		<a class="nav-link" href="IniciarSesion.php">Iniciar Sesion</a>
		</li>
		</ul>
</nav>

<div class="container">
	<div class="marginz row" style="display: flex;">
			<style>
					.caja {
						border: 3px solid #EC4811;
					
						display: inline-block;
						margin: 20px;
						height: 500px;
						
					}
			</style>
			<br>
			<div class="col-xs-12 col-md-4 rounded align-self-center" >
				
			</div>
			<div class="col-xs-12 col-md-3 caja rounded align-self-center">
				<br><h4 class="text-center" style ="color: #69A50B; font-weight: bold;">Login</h4> <br>
				<div class="card">
				<div class="card-body">

                    <?php if(isset($mensaje)) {?>
                        <div class="alert alert-danger" role="alert">
                            <?php echo $mensaje; ?>
                        </div>
                    <?php } ?>
                        <form method="POST">

                        <div class = "form-group">
                        <label >Usuario</label>
                        <input type="text" class="form-control" name="usuario" placeholder="Escribe tu usuario">
                        </div>

                        <div class="form-group">
                        <label >Contraseña:</label>
                        <input type="password" class="form-control" name="contrasenia"  placeholder="Escribe tu contraseña">
                        </div>
                        <button type="submit" name="accion" value="Login" class="btn  btn-dark btn-block"> Iniciar Sesión </button>
                        
                        </form>
                        
                        


                    </div>
					
				</div>
			
			</div>
			<div class="col-xs-12 col-md-2 rounded align-self-center"></div>
	</div>
	
		  
		  
	
</div>

<div class=" row alert alert-success" role="alert">
	<div class="col-4">
	<img src="../img/logo.png" >
	</div>
	<div class="col-4 align-self-center">
	<center><strong>Polígono El Prado / Calle Carlos SN - Mérida Extremadura </strong></center>
	</div>
	<div class="col-4 align-self-center">
	 <center> <img src="../img/soporte.png" >
	admin@stonefruit.es</center>
	</div>
</div>
	
    <script src="../js/jquery-3.5.1.min.js"></script>
	<script src="../js/popper.min.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	
	
</body>
</html>