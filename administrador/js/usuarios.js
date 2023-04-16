var arrayUsuarios = []; // variable general donde almacenamos los tratamientos
var rolFilter=""; // variable general donde almacenamos el valor del terreno variedad aplicado

/*
Nombre:obtenerDatosUsuarios
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los usuarios de la base de datos,los alamacena en la variable general 
y llama a la función crearHTMLUsuarios para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerDatosUsuarios(){

$.post('phpUsuarios/obtenerUsuario.php',{
 
},
  function(datos,estado){
     
      var tratamientos = [] ;
      tratamientos = datos;

      jsonTratamientos = JSON.parse(tratamientos);
      arrayUsuarios = jsonTratamientos;
      crearHTMLUsuarios();
  } );

}

/*
Nombre:crearHTMLUsuarios
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los usuarios,
obtenidos anteriormente y almacenados en la variable general arrayUsuarios.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLUsuarios(){

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-6"> <button class="btn btn-primary " data-toggle="modal" data-target="#añadirUsuarioModal" style="background: red;" onclick="añadirUsuario()"> Añadir Nuevo Usuario</button>
        <button class="btn btn-success " onclick="exportarExcelUsuario()"> EXCEL </button>
        </div>
        <div class="col-3"> 
        </div>
        <div class="col-3"> 
                <select class="browser-default custom-select" id="rol"  onchange="getValueRolUsuario(this);">`
                if(rolFilter == ""){
                    dival +=   ` <option selected="true"  value="todos" >Todos los roles</option>`
            }else{
                dival +=   ` <option value="todos" >Todos los roles</option>`
            }

                    if(rolFilter == "agricultor"){
                        dival +=   ` <option selected="true"  value="agricultor" >agricultor</option>`
                        arrayUsuarios= arrayUsuarios.filter(e => e.rol == rolFilter );
                }else{
                    dival +=   ` <option value="agricultor" >agricultor</option>`
                }

                if(rolFilter == "tecnico"){
                    dival +=   ` <option selected="true"  value="tecnico" >tecnico</option>`
                    arrayUsuarios= arrayUsuarios.filter(e => e.rol == rolFilter );
            }else{
                dival +=   ` <option value="tecnico" >tecnico</option>`
            }

                if(rolFilter == "administrador"){
                    dival +=   ` <option selected="true"  value="administrador" >administrador</option>`
                    arrayUsuarios= arrayUsuarios.filter(e => e.rol == rolFilter );
            }else{
                dival +=   ` <option value="administrador" >administrador</option>`
            }
                            

                dival +=   `   </select>
        </div>
    </div>

    <style>
        .titulo{

        font-weight: bold;
        color: #EC4811;
        font-size:20px;

    }
     </style >
        <div class="row" >
            <div class=" titulo col-6" style="padding-left: 25px">
                <p>Nombre</p>
            </div>
            <div class="titulo col-2" style="padding-left: 0px">
                <p>Usuario</p>
            </div>
            <div class="titulo col-2" style="padding-left: 40px">
                <p>Rol</p>
            </div>
            
        </div>
`

var i=0;
arrayUsuarios.forEach(element => {


    dival +=   `<div class="row">
     
			            <div class="col-12">
				                <div id="accordion">
                                                <!-- CARD #1 -->
                                                <div class="card">
                                                    <div class="card-header" id="heading${i}">
                                                                        <style>
                                                                            .datos{
                                                            
                                                                                font-style: oblique;
                                                                                font-weight: bold;
                                                                                }
                                                                        </style>
                                        
                                                            <div class="row">
                                                                    <div class=" datos col-6 align-self-center">
                                                                    <p>${element.apellido1} ${element.apellido2},${element.nombre}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.usuario}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.rol}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editarUsuarioModal" onclick="modificarUsuario('${element.usuario}')"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarUsuario('${element.usuario}')">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                    </svg></button>
                                                                    </div>

                                                                    
                                                                </div>     
                                                    </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">
                                                            <div class="col">
                                                                <p><strong>Telefono:</strong> ${element.telefono}</p>
                                                                <p><strong>Correo:</strong> ${element.correo}</p>
                                                                <p><strong>DNI:</strong> ${element.dni}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
			                    </div>
                         </div>
                    </div>`
    i++;
 });

 divAlmacen.innerHTML = dival;
}

/*
Nombre:añadirUsuario
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir un nuevo usuario. 
*/
function añadirUsuario(){

    var divEAñadir= document.getElementById("añadirUsuarioModal");
    
    divEAñadir.innerHTML = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVO USUARIO</h5>
             
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Nombre: * </label>
                <input type="text" class="form-control" id="añadir-nombre">
              </div>
  
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Apellido 1: * </label>
                <input type="text" class="form-control" id="añadir-ape1" >
              </div>
  
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Apellido 2:</label>
                <input type="text" class="form-control" id="añadir-ape2">
              </div>
  
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Usuario: * </label>
                <input type="text" class="form-control" id="añadir-usuario" required>
              </div>
  
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Contraseña: * </label>
                <input type="password" class="form-control" id="añadir-contraseña">
              </div>
  
              <div class="form-group">
              
                <label for="recipient-name" class="col-form-label">Rol: * </label>
                <select class="browser-default custom-select" id="añadir-rol" >
                <option value="" ></option>
                <option value="administrador" >administrador</option>
                <option value="tecnico" >tecnico</option>
                <option value="agricultor" >agricultor</option>
                </select>
              </div>

              <div class="form-group">
                <label for="recipient-name" class="col-form-label">DNI:</label>
                <input type="text" class="form-control" id="añadir-DNI">
              </div>
  
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Correo:</label>
                <input type="text" class="form-control" id="añadir-correo">
              </div>

              <div class="form-group">
              <label for="recipient-name" class="col-form-label">Telefono:</label>
              <input type="text" class="form-control" id="añadir-telefono">
            </div>

  
              
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosUsuarios()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarAñadirUsuario()">Añadir nuevo usuario</button>
  
          </div>
        </div>
      </div>
  
      `
  }

/*
Nombre:enviarAñadirUsuario
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir un nuevo usuario,
y guarda los cambios en base de datos.
*/
  function enviarAñadirUsuario(){

    var nombre = document.getElementById('añadir-nombre');
    var ape1 = document.getElementById('añadir-ape1');
    var ape2 = document.getElementById('añadir-ape2');
    var usuario = document.getElementById('añadir-usuario');
    var cn = document.getElementById('añadir-contraseña');
    var rol = document.getElementById('añadir-rol');
    var DNI = document.getElementById('añadir-DNI');
    var correo = document.getElementById('añadir-correo');
    var telefono = document.getElementById('añadir-telefono');

if( usuario.value != '' && nombre.value !='' && ape1.value !='' && cn.value!='' && rol.value !=''){

                    $.post('phpUsuarios/añadirUsuario.php',{
                        nombre: nombre.value,
                        ape1 : ape1.value,
                        ape2 : ape2.value,
                        usuario : usuario.value,
                        cn : cn.value,
                        rol : rol.value,
                        DNI : DNI.value,
                        correo : correo.value,
                        telefono : telefono.value

                    },
                        function(datos,estado){

                        console.log(datos);
                        if(datos == 11){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Usuario guardado con exito',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                obtenerDatosUsuarios();
                                $("#añadirUsuarioModal").modal("hide");

                            }else{

                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'ERROR',
                                text: 'No se ha guardado el usuario.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            }
                        })
    }else{

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al guardar el usuario. Exiten campos obligatorios vacios.',
            
          })

        

        
    }
  }

  /*
Nombre:eliminarAlbaran
Valores de entrada: usuario
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar el usuario que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
  function eliminarUsuario(usuario){
    Swal.fire({
        title: '¿Estas seguro de eliminar el usuario?',
        text: 'Una vez eliminado, no podra recuperarse la información',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          
                        $.post('phpUsuarios/eliminarUsuario.php',{
                          usuario : usuario
                          
                      },
                          function(datos,estado){
                              
                          if(datos == 11){
                             
                            Swal.fire(
                              'ELIMINADO',
                              'El usuario ha sido eliminado correctamente.',
                              'success'
                            )
                           obtenerDatosUsuarios();
                            }
                          } )
                     
        }
      })
  }
/*
Nombre:modificarUsuario
Valores de entrada: usuario
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder modificar el usuario que pasamos
como parametro de entrada. 
*/
  function modificarUsuario(usuario){
    arrayUsuarios.forEach(elemt => {

        if(elemt.usuario == usuario){
  
            var divEAñadir= document.getElementById("editarUsuarioModal");

            var dival = `
  
      
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">MODIFICAR USUARIO</h5>
                   
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label ">Nombre: * </label>
                      <input type="text" class="form-control" id="editar-nombre" value="${elemt.nombre}">
                    </div>
        
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Apellido 1: * </label>
                      <input type="text" class="form-control" id="editar-ape1" value="${elemt.apellido1}" >
                    </div>
        
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Apellido 2:</label>
                      <input type="text" class="form-control" id="editar-ape2" value="${elemt.apellido2}">
                    </div>
        
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Usuario: * </label>
                      <input type="text" class="form-control" id="editar-usuario" value="${elemt.usuario}" >
                    </div>
        
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Contraseña: * </label>
                      <input type="password" class="form-control" id="editar-contraseña" value="${elemt.cn}">
                    </div>
        
                    <div class="form-group">
                    
                      <label for="recipient-name" class="col-form-label">Rol: * </label>
                      <select class="browser-default custom-select" id="editar-rol" > 
                      `
                      if(elemt.rol == "administrador"){
                        dival +=`<option selected="true" value="administrador" >administrador</option>`
                      }else{
                        dival +=`<option value="administrador" >administrador</option>`
                      }

                      if(elemt.rol == "tecnico"){
                        dival +=`<option selected="true" value="tecnico" >tecnico</option>`
                      }else{
                        dival +=`<option value="tecnico" >tecnico</option>`
                      }

                      if(elemt.rol == "agricultor"){
                        dival +=`<option selected="true" value="agricultor" >agricultor</option>`
                      }else{
                        dival +=`<option value="agricultor" >agricultor</option>`
                      }
                    
                      dival +=`</select>
                    </div>
      
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">DNI:</label>
                      <input type="text" class="form-control" id="editar-DNI" value="${elemt.dni}">
                    </div>
        
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label">Correo:</label>
                      <input type="text" class="form-control" id="editar-correo" value="${elemt.correo}">
                    </div>
      
                    <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Telefono:</label>
                    <input type="text" class="form-control" id="editar-telefono" value="${elemt.telefono}">
                  </div>
      
        
                    
                  </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosUsuarios()" >Cerrar</button>
                  <button type="button" class="btn btn-success" onclick="enviarModificarUsuario()">Modificar usuario</button>
        
                </div>
              </div>
            </div>
          
        
        
            
            `
    
      divEAñadir.innerHTML = dival;
        }
  
    });
  }

/*
Nombre:enviarAñadirUsuario
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir un nuevo usuario,
y guarda los cambios en base de datos.
*/
function enviarModificarUsuario(){

    var nombre = document.getElementById('editar-nombre');
    var ape1 = document.getElementById('editar-ape1');
    var ape2 = document.getElementById('editar-ape2');
    var usuario = document.getElementById('editar-usuario');
    var cn = document.getElementById('editar-contraseña');
    var rol = document.getElementById('editar-rol');
    var DNI = document.getElementById('editar-DNI');
    var correo = document.getElementById('editar-correo');
  
    var telefono = document.getElementById('editar-telefono');

      if( usuario.value != '' && nombre.value !='' && ape1.value !='' && cn.value!='' && rol.value !=''){

        $.post('phpUsuarios/editarUsuario.php',{
            nombre: nombre.value,
            ape1 : ape1.value,
            ape2 : ape2.value,
            usuario : usuario.value,
            cn : cn.value,
            rol : rol.value,
            DNI : DNI.value,
            correo : correo.value,
            telefono : telefono.value

        },
            function(datos,estado){

            console.log(datos);
            if(datos == 11){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario editado con exito',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    obtenerDatosUsuarios();
                    $("#editarUsuarioModal").modal("hide");
                }else{

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'ERROR',
                    text: 'No se ha editado el usuario.',
                    showConfirmButton: false,
                    timer: 1500
                })
                }
            })
}else{

            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al guardar el usuario. Exiten campos obligatorios vacios.',

            })
      }
}

/*
Nombre:getValueRolUsuario
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select rol,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosUsuarios()
*/
function getValueRolUsuario(filtro){
    var pro = filtro.options[filtro.selectedIndex].value;
    rolFilter = pro;
   obtenerDatosUsuarios();
}

/*
Nombre:exportarExcelUsuario
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de usuarios al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetUsu para crear el excel con los datos.
*/ 
function exportarExcelUsuario(){

  var jsonDataObject = eval(arrayUsuarios);		
  exportWorksheetUsu(jsonDataObject);
}

 /*
Nombre:exportWorksheetUsu
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetUsu(jsonObject) {
  var myFile = "misUsuarios.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}