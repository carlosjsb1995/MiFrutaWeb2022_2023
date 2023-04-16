
var jsonAlbaranes; // variable general donde almacenamos los albaranes
var jsonAlbaranesLineas; // variable general donde almacenamos las lineas de los albaranes
var filterProv = ""; // variable general donde almacenamos el valor del filtro proveedor aplicado
var filterTipo= ""; // variable general donde almacenamos el valor del filtro tipo albaran aplicado

var jsonMaterialesGlobal; // variable general donde almacenamos los materiales actuales del almacen

/*
Nombre:obtenerDatosAlbaranes
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los albaranes de la base de datos,
los alamacena en la variable general y llama a la función obtenerDatosAlbaranesLineas para obtener mas datos.
*/
function obtenerDatosAlbaranes(){

      //OBTENEMOS LOS DATOS DE LOS ALBARANES.
      $.post('phpAlmacen/albaranes.php',{
 
      },
        function(datos,estado){
           
            var albaranes = [];
            albaranes = datos;
      
            jsonAlbaranes = JSON.parse(albaranes);
            obtenerDatosAlbaranesLineas();
          
        } );
}  

/*
Nombre:obtenerDatosAlbaranesLineas
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las lineas de los albaranes de la base de datos,
las alamacena en la variable general y llama a la función obtenerProveedores para obtener los datos necesario de un filtro.
*/
function obtenerDatosAlbaranesLineas(){

    //OBTENEMOS LOS DATOS DE LAS LÍNEAS DE LOS ALBARANES.
    $.post('phpAlmacen/albaranesLineas.php',{

    },
      function(datos,estado){
         
          var albaranesLineas = [] ;
          albaranesLineas = datos;
    
          jsonAlbaranesLineas = JSON.parse(albaranesLineas);
          obtenerProveedores();
                  
      } )
} 

/*
Nombre:obtenerProveedores
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los proveedores de la base de datos
 y llama a la función cargarHtmlAlmacen para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerProveedores(){

//OBTENEMOS LOS DATOS DE LOS PROVEEDORES.
$.post('phpAlmacen/obtenerProveedores.php',{

},
  function(datos,estado){
     
      var prove = [] ;
      prove = datos;

      jsonProv = JSON.parse(prove);
      cargarHtmlAlmacen(jsonProv);
    
  } )

}

/*
Nombre:cargarHtmlAlmacen
Valores de entrada: jsonProv -> array con los datos de los proveedores existentes.
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los albaranes,
obtenidos anteriormente y almacenados en la variable general jsonAlbaranes y sus lineas alamacenados en jsonAlbaranesLineas.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function cargarHtmlAlmacen(jsonProv){

// Creo la estructura html.

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-6"> <button class="btn btn-info "  onclick="miAlmacen()">MI ALMACEN</button>
        
         <button class="btn btn-primary " data-toggle="modal" data-target="#añadirUsuarioModal" style="background: red;" onclick="añadirAlbaran()"> Añadir Nuevo albaran</button>
         <button class="btn btn-success " onclick="exportaExcelAlbaranes()">EXCEL</button>
        
        </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="rol"  onchange="changeProveedor(this);">`
        if(filterProv == ""){
          dival +=   ` <option selected="true"  value="" >Todos los proveedores</option>`
      }else{
          dival +=   ` <option value="" >Todos las variedades</option>`
      }

      jsonProv.forEach(elementvar => {
          if(filterProv == elementvar.id){
            dival += `<option selected="true" value="${elementvar.id}">${elementvar.id} </option>`
            jsonAlbaranes= jsonAlbaranes.filter(e => e.proveedor == elementvar.id );

        }else{
            
            dival += `<option value="${elementvar.id}">${elementvar.id} </option>`
        }

        });
                    

        dival +=   `   </select>
</div>
<div class="col-3"> 
<select class="browser-default custom-select" id="rol"  onchange="changeTipoAlbaran(this);">`
if(filterTipo == ""){
  dival +=   ` <option selected="true"  value="" >Todos los tipos</option>`
}else{
  dival +=   ` <option value="" >Todos los tipos</option>`
}


  if(filterTipo == 'ENTRADA'){
    dival += `<option selected="true" value="ENTRADA">ENTRADA</option>`
    jsonAlbaranes= jsonAlbaranes.filter(e => e.tipo =='ENTRADA');

}else{
    
    dival += `<option value="ENTRADA">ENTRADA</option>`
}

if(filterTipo == 'SALIDA'){
  dival += `<option selected="true" value="SALIDA">SALIDA</option>`
  jsonAlbaranes= jsonAlbaranes.filter(e => e.tipo =='SALIDA');

}else{
  
  dival += `<option value="SALIDA">SALIDA</option>`
}

if(filterTipo == 'ENTRADA USURIO'){
  dival += `<option selected="true" value="ENTRADA USURIO">ENTRADA USURIO</option>`
  jsonAlbaranes= jsonAlbaranes.filter(e => e.tipo =='ENTRADA USURIO');

}else{
  
  dival += `<option value="ENTRADA USURIO">ENTRADA USURIO</option>`
}

if(filterTipo == 'SALIDA USUARIO'){
  dival += `<option selected="true" value="SALIDA USUARIO">SALIDA USUARIO</option>`
  jsonAlbaranes= jsonAlbaranes.filter(e => e.tipo =='SALIDA USUARIO');

}else{
  
  dival += `<option value="SALIDA USUARIO">SALIDA USUARIO</option>`
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
        <div class=" titulo col-1" >
                <p>Nº</p>
            </div>
            <div class=" titulo col-2" >
                <p>TIPO</p>
            </div>
            <div class="titulo col-2" >
            <p>PROVEEDOR</p>
             </div>
            <div class="titulo col-3" >
                <p>DESCRIPCIÓN</p>
            </div>
            <div class="titulo col-2" >
                <p>FECHA</p>
            </div>
            
        </div>
`


var i=0;
jsonAlbaranes.forEach(element => {

     var lineasFiltradas = jsonAlbaranesLineas.filter(e => e.idAlbaran == element.id);
     
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
                                                                    <div class=" datos col-1 align-self-center">
                                                                    <p>${element.id}</p>
                                                                    </div>
                                                                    <div class=" datos col-2 align-self-center">
                                                                    <p>${element.tipo}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.proveedor}</p>
                                                                    </div>
                                                                    <div class="datos col-3 align-self-center">
                                                                    <p>${element.descripcion}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.fecha}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editarUsuarioModal" onclick="modificarAlbaran(${element.id})"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarAlbaran(${element.id})">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                    </svg></button>
                                                                    </div>

                                                                    
                                                                </div>     
                                                    </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">`
                                                        lineasFiltradas.forEach(element2 => {

                                                            dival +=` <div class="row-12">
                                                            <p><strong>LÍNEA:</strong> ${element2.linea},<strong>Material:</strong> ${element2.nombre},<strong>Cantidad:</strong>${element2.cantidad},<strong>Comentario:</strong>${element2.comentario}  
                                                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editarUsuarioModal" onclick="modificarLinAlbaran(${element2.linea},${element2.idAlbaran})"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                            </svg></button>
                                                            <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarLineaAlbaran(${element2.linea},${element2.idAlbaran})">
                                                            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                            </svg></button>

                                                             </p>
                                                            
                                                    </div>`
                                                        });

                                                            
                                                                
                                                        dival += ` 
                                                        <div class="row-12">
                                                       
                                                        <div class="col-12 align-self-center">
                                                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editarUsuarioModal" onclick="añadirLineaAlbaran(${element.id})" >Añadir línea albarán</button>
                                                        <button type="button" class="btn btn-warning"  onclick="generarPDFAlbaran(${element.id})" >Generar PDF</button>
                                                        </div>
                                                        
                                                        </div>
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
Nombre:changeProveedor
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select proveedores,
para filtrar nuestro array de albaranes por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosAlbaranes()
*/
function changeProveedor(filtro){

  var pro = filtro.options[filtro.selectedIndex].value;
  filterProv = pro;
  obtenerDatosAlbaranes();
}

/*
Nombre:cargarHtmlAlmacen
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select tipo Albaran,
para filtrar nuestro array de albaranes por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosAlbaranes()
*/
function changeTipoAlbaran(filtro){
  var pro = filtro.options[filtro.selectedIndex].value;
  filterTipo = pro;
  obtenerDatosAlbaranes();
}

/*
Nombre:eliminarLineaAlbaran
Valores de entrada: linea,idAlbaran
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar la linea del albaran que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarLineaAlbaran(linea,idAlbaran){
    Swal.fire({
        title: '¿Estas seguro de eliminar la linea:'+linea+' del albaran: '+idAlbaran+'?',
        text: 'Una vez eliminado, no podra recuperarse la información',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          
                        $.post('phpAlmacen/eliminarLineaAlbaran.php',{
                          id : idAlbaran,
                          linea : linea
                      },
                          function(datos,estado){
  
                          if(datos == 1){
                             
                            Swal.fire(
                              'ELIMINADO',
                              'La linea del albaran ha sido eliminado correctamente.',
                              'success'
                            )
                            obtenerDatosAlbaranes();
                            }
                          } )
  
                     
        }
      });
}

/*
Nombre:eliminarLineaAlbaran
Valores de entrada: linea,idAlbaran
Valores de salida: Ninguno
Descripción de la función: Se obtienen los datos de la linea del albaran que queremos modificar,
y se llama a la funcion ObtenerTiposMateriales, para obtener los valores para el select de tipo de material.
*/
function modificarLinAlbaran(linea,idAlbaran){

  $.post('phpAlmacen/obtenerDatosLineaAlbaran.php',{

      id : idAlbaran,
      linea : linea
   },
     function(datos,estado){
        
         var albaranLinea = [] ;
         albaranLinea = datos;
  
         var jsonAlbaranLinea = JSON.parse(albaranLinea);
         ObtenerTiposMateriales(jsonAlbaranLinea);
       
     } )
}

/*
Nombre:ObtenerTiposMateriales
Valores de entrada: jsonLinea
Valores de salida: Ninguno
Descripción de la función: Se obtienen los datos de los materiales que tenemos en base de datos,
y se llama a la funcion crearHTMLModificarLin,para crear el html que nos permita modificar la linea en el modal.
*/
function ObtenerTiposMateriales(jsonLinea){

    $.post('phpAlmacen/obtenerTiposMateriales.php',{
   
     },
       function(datos,estado){
          
           var materiales = [] ;
           materiales = datos;
          
           var jsonMateriales = JSON.parse(materiales);
           crearHTMLModificarLin(jsonLinea,jsonMateriales);
         
       } )
}

/*
Nombre:crearHTMLModificarLin
Valores de entrada: linea,tipoMateriales
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder editar la linea del 
albaran que recibimos en el parametro linea. tipoMateriales lo usamos para crear un select con los materiales que tenemos en 
base de datos.
*/
function crearHTMLModificarLin(linea,tipoMateriales){

    var divEAñadir= document.getElementById("editarUsuarioModal");
    var elemt = linea[0];

    var dival  = `
  
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">MODIFICAR LÍNEA ALBARÁN</h5>
           
        </div>
        <div class="modal-body">
          <form>
          <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Nº Albarán: * </label>
              <input class="form-control" id="modificaral-idAlbaran" value="${elemt.idAlbaran}" readonly>
            </div>
            <div class="form-group">
              <input type="hidden" class="form-control" id="modificaral-idAMaterial" value="${elemt.idMaterial}" readonly>
            </div>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Línea: * </label>
              <input type="text" class="form-control" id="modificaral-lineaAlbaran" value="${elemt.linea}" readonly>
            </div>

            <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Material: * </label>
              <select class="browser-default custom-select" id="materialLineaSelect" onchange="changematerialLineaSelect(this);">
              <option selected="true"  value="${elemt.idMaterial}" >${elemt.nombre}</option>`

              tipoMateriales.forEach(elementMaterial => {

              if(elementMaterial.nombre != elemt.nombre )
                dival +=   `<option value="${elementMaterial.id}">${elementMaterial.nombre} </option>`
              });


              dival  +=` </select>  </div>

             <div class="form-group">
             <label for="recipient-name" class="col-form-label ">Cantidad: * </label>
             <input type="number" class="form-control" id="modificaral-cantidad" value="${elemt.cantidad}">
              </div>
             <div class="form-group">
            <label for="recipient-name" class="col-form-label ">Comentario: * </label>
            <textarea class="form-control" id="modificaral-comentario">${elemt.comentario}</textarea>
             </div>
             
          </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosAlbaranes()" >Cerrar</button>
          <button type="button" class="btn btn-success" onclick="modificarLineaAlbaran()">Modificar línea Albarán</button>

        </div>
      </div>
    </div>
    `
    divEAñadir.innerHTML = dival;
}

/*
Nombre:modificarLineaAlbaran
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para editar la linea,
y guarda los cambios en base de datos.
*/
function modificarLineaAlbaran(){

    var idAlbaran = document.getElementById('modificaral-idAlbaran');
    var linea =  document.getElementById('modificaral-lineaAlbaran');
    var idMaterial =  document.getElementById("modificaral-idAMaterial"); 
    var cantidad =  document.getElementById("modificaral-cantidad"); 
    var comentario =  document.getElementById("modificaral-comentario"); 

                   $.post('phpAlmacen/modificarLineaAlbaran.php',{
                      idAlbaran: idAlbaran.value,
                      linea : linea.value,
                      idMaterial : idMaterial.value,
                      cantidad : cantidad.value,
                      comentario : comentario.value
  
                    },
                        function(datos,estado){
  
                        if(datos == 1){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'línea de albarán actulizada con exito',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                               
                                obtenerDatosAlbaranes();
                                $("#editarUsuarioModal").modal("hide");
                            }else{
  
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'ERROR',
                                text: 'No se ha actulizado la línea del albarán.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            }
                        });
}

/*
Nombre:changematerialLineaSelect
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion para obtener el idMaterial segun el valor seleccionado en el select de los materiales.
*/
function changematerialLineaSelect(tipoMateriales){

    var pro = tipoMateriales.options[tipoMateriales.selectedIndex].value;
    var variedadEntradaInput= document.getElementById("modificaral-idAMaterial"); 
    variedadEntradaInput.value = pro;

}

/*
Nombre:añadirAlbaran
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion para añadir un nuevo albaran, que nos obtiene el numero del proximo albaran permitido 
en base de datos. Posteriormente llama a obtenerUsuariosAgricultores para obtener mas datos.
*/
function añadirAlbaran(){

    $.post('phpAlmacen/obteneridAlbaran.php',{
 
    },
      function(datos,estado){
         
          var idAlbaran = [] ;
          idAlbaran = datos;
         
          var jsonID = JSON.parse(idAlbaran);
          var nalbaran = jsonID[0].id;
          obtenerUsuariosAgricultores(nalbaran);

      } )
 }

 /*
Nombre:obtenerUsuariosAgricultores
Valores de entrada: nalbaran
Valores de salida: Ninguno
Descripción de la función: Se obtienen los datos de los agricutlores que tenemos en base de datos,
y llamamos a la funcion crearNuevoAlbaran para obtener el html que nos permita añadir un nuevo albaran en el modal. 
*/
 function obtenerUsuariosAgricultores(nalbaran){
    $.post('phpAlmacen/obtenerUsuariosAgricultores.php',{
       
    },
      function(datos,estado){
         
          var idAlbaran = [] ;
          idAlbaran = datos;
         
          var jsonID = JSON.parse(idAlbaran);
          crearNuevoAlbaran(nalbaran,jsonID);


      } )

 }

 /*
Nombre:crearNuevoAlbaran
Valores de entrada: nalbaran,jsonAgricultor
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir un nuevo albaran que recibimos
 en el parametro nalbaran. jsonAgricultor lo usamos para crear un select con los provedores que tenemos en base de datos.
*/
 function crearNuevoAlbaran(nalbaran,jsonAgricultor){

    var divEAñadir= document.getElementById("añadirUsuarioModal");

    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVO ALBARÁN</h5>
             
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Nº Albarán: * </label>
                <input type="text" class="form-control" id="añadiraA-nalbaran" value="${nalbaran}" readonly>
              </div>
               <div class="form-group">
               <label for="recipient-name" class="col-form-label ">Fecha: * </label>
               <input type="date" class="form-control" id="añadirA-fecha">
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Tipo: * </label>
                <select class="browser-default custom-select" id="añadirA-tipoAlbaran" onchange="proveedorTipo(this);">
                <option  value="" >Seleccione un valor...</option>
                <option  value="ENTRADA" >ENTRADA</option>
                <option   value="SALIDA" >SALIDA</option>
                <option  value="ENTRADA USUARIO" >ENTRADA USUARIO</option>
                <option   value="SALIDA USUARIO" >SALIDA USUARIO</option>
                </select>
                </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Proveedor:  </label>
              <input type="hidden" class="form-control" id="añadirA-Proveedor" >
              <select class="browser-default custom-select" id="añadirAS-Proveedor" style="visibility:hidden">
              <option  value="" > Seleccione un agricultor...</option>`

              jsonAgricultor.forEach(elementMaterial => {

              
                dival +=   `<option value="${elementMaterial.id}">${elementMaterial.id} </option>`
              });


              dival  +=` </select>  </div>

               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Descripción: </label>
              <textarea class="form-control" id="añadirA-descripcion"></textarea>
               </div>
               <div class="form-group" id="añadirA-divLineas">
               </div>
               
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosAlbaranes()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarAñadirNuevoAlbaran()">Añadir nuevo Albarán</button>
  
          </div>
        </div>
      </div>

      `
      divEAñadir.innerHTML = dival;
 }

 /*
Nombre:proveedorTipo
Valores de entrada: tipoAlbaranSeleccionado
Valores de salida: Ninguno
Descripción de la función: Funcion que nos muestra unos campos o otros para añadir el proveedor segun el tipo de albaran selecionado.
En el caso de que tipo sea ENTRADA o SALIDA, se nos muestra un input donde poder añadir lo que quereamos, ocultando el select con 
los agricultores.En el caso de que tipo sea ENTRADA USUARIO o SALIDA USUARIO, se nos muestra un select con los agricultores, 
y el input donde introducir el proveedor que queramos queda oculto.
*/
 function proveedorTipo(tipoAlbaranSeleccionado){

    var tipoAl = tipoAlbaranSeleccionado.options[tipoAlbaranSeleccionado.selectedIndex].value;
    
    if(tipoAl=="ENTRADA" || tipoAl=="SALIDA"){
        document.getElementById('añadirA-Proveedor').type = 'text';

        document.getElementById('añadirAS-Proveedor').style = 'visibility:hidden';

    }

    if(tipoAl=="ENTRADA USUARIO" || tipoAl=="SALIDA USUARIO"){
        document.getElementById('añadirA-Proveedor').type = 'hidden';
        document.getElementById('añadirAS-Proveedor').style = '';
    }

 }

 /*
Nombre:añadirLineaAlbaran
Valores de entrada: idAlbaran
Valores de salida: Ninguno
Descripción de la función: Funcion para añadir una nueva linea de albaran, que nos obtiene los materiales  
en base de datos. Posteriormente llama a obtenerlineaAlbaran para obtener mas datos.
*/
 function añadirLineaAlbaran(idAlbaran){

  $.post('phpAlmacen/obtenerTiposMateriales.php',{
     
  },
    function(datos,estado){
       
        var materiales = [] ;
        materiales = datos;
       
        var jsonMateriales = JSON.parse(materiales);
        obtenerlineaAlbaran(jsonMateriales,idAlbaran);
      
    } )
 }

  /*
Nombre:añadirLineaAlbaran
Valores de entrada: jsonMateriales,idAlbaran
Valores de salida: Ninguno
Descripción de la función: Funcion que nos obtiene la proxima linea del albaran indicado y posteriormente,  
llama a la funcion crearHtmlNuevaLinea para crear el html necesario para añadir la linea.
*/
 function obtenerlineaAlbaran(jsonMateriales,idAlbaran){

  $.post('phpAlmacen/obtenerLineaAlbaran.php',{
 
   id : idAlbaran
  },
    function(datos,estado){
       
        var lineas = [] ;
        lineas = datos;
       
        var jsonID = JSON.parse(lineas);
        var lin = jsonID[0].linea;
         crearHtmlNuevaLinea(jsonMateriales,idAlbaran,lin);

    } )
 }

 /*
Nombre:crearHtmlNuevaLinea
Valores de entrada: materiales,id,linea
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML necesario para poder añadir la linea del 
albaran que recibimos en el parametro id. materiales lo usamos para crear un select con los materiales que tenemos en 
base de datos.
*/
 function crearHtmlNuevaLinea(materiales,id,linea){
  console.log("Datos que recibo");
  console.log(linea);
  console.log(materiales);
  console.log(id);

  var divEAñadir= document.getElementById("editarUsuarioModal");
  
  var dival  = `

    
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVA LÍNEA ALBARÁN</h5>
         
      </div>
      <div class="modal-body">
        <form>
        <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Nº Albarán: * </label>
            <input class="form-control" id="modificaral-idAlbaran" value="${id}" readonly>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label ">Línea: * </label>
            <input type="text" class="form-control" id="modificaral-lineaAlbaran" value="${linea}" readonly>
          </div>

          <div class="form-group">
            <label for="recipient-name" class="col-form-label ">Material: * </label>
            <select class="browser-default custom-select" id="materialLineaSelect" onchange="changematerialLineaSelect(this);">
            <option selected="true"  value="" ></option>`

            materiales.forEach(elementMaterial => {

              dival +=   `<option value="${elementMaterial.id}">${elementMaterial.nombre} </option>`
            });


            dival  +=` </select>  </div>

           <div class="form-group">
           <label for="recipient-name" class="col-form-label ">Cantidad: * </label>
           <input type="number" class="form-control" id="modificaral-cantidad" value="">
            </div>
           <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Comentario: * </label>
          <textarea class="form-control" id="modificaral-comentario"></textarea>
           </div>
           
        </form>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosAlbaranes()" >Cerrar</button>
        <button type="button" class="btn btn-success" onclick="enviarAñadirNuevoAlbaranL()">Añadir nueva línea Albarán</button>

      </div>
    </div>
  </div>



  
  `
 
  divEAñadir.innerHTML = dival;

 }
 
 /*
Nombre:enviarAñadirNuevoAlbaran
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir el nuevo albaran,
y guarda los cambios en base de datos.
*/
 function enviarAñadirNuevoAlbaran(){

  // Primero creo el nuevo albaran, luego las lineas.
  var idalbaran = document.getElementById('añadiraA-nalbaran');
  var fecha = document.getElementById('añadirA-fecha');
  var tipo = document.getElementById('añadirA-tipoAlbaran');
  var provin = document.getElementById('añadirA-Proveedor');
  var provs = document.getElementById('añadirAS-Proveedor');
  var desc = document.getElementById('añadirA-descripcion');
  var proveedorDesc ="";

  if(  idalbaran.value !='' && fecha.value !='' && tipo.value !=''){

    if( tipo.value =='ENTRADA' || tipo.value=='SALIDA'){

      proveedorDesc = provin.value;
    }else{

      proveedorDesc = provs.value;


    }

  $.post('phpAlmacen/añadirAlbaran.php',{
    idalbaran: idalbaran.value,
    fecha : fecha.value,
    tipo : tipo.value,
    prov : proveedorDesc,
    desc : desc.value

  },
      function(datos,estado){

     

      if(datos == 1){
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Albaran actulizado con exito',
                  showConfirmButton: false,
                  timer: 1500
              })
              obtenerDatosAlbaranes();
              $("#añadirUsuarioModal").modal("hide");
          }else{

          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'ERROR',
              text: 'No se ha actulizado el albaran.',
              showConfirmButton: false,
              timer: 1500
          })
          }
      })


}else{
  
  console.log("entro en el else ");
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al guardar el albaran. Exiten campos obligatorios vacios.',
      
    })
  
}

}

 /*
Nombre:enviarAñadirNuevoAlbaranL
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir la nueva linea del albaran,
y guarda los cambios en base de datos.
*/ 
function enviarAñadirNuevoAlbaranL(){

  var idalbn = document.getElementById('modificaral-idAlbaran');
  var lineaal = document.getElementById('modificaral-lineaAlbaran');
  var material = document.getElementById('materialLineaSelect');
  var cantidad = document.getElementById('modificaral-cantidad');
  var comentario = document.getElementById('modificaral-comentario');

    if(  material.value !='' && cantidad.value !='' ){
   
  
    $.post('phpAlmacen/añadirAlbaranl.php',{
      idalbaran: idalbn.value,
      linea : lineaal.value,
      material : material.value,
      cantidad : cantidad.value,
      comentario : comentario.value
  
    },
        function(datos,estado){
  
        console.log(datos);
  
        if(datos == 1){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Linea  añadida con exito',
            showConfirmButton: false,
            timer: 1500
        })
        obtenerDatosAlbaranes();
        $("#añadirUsuarioModal").modal("hide");
              
            }else{
  
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'ERROR',
                text: 'No se ha actulizado la linea: ',
                showConfirmButton: false,
                timer: 1500
            })
            }
        })
  
  
  }else{
    
    console.log("entro en el else ");
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al guardar la entrada. Exiten campos obligatorios vacios.',
        
      })
  
    
    }
    
  
}

/*
Nombre:eliminarAlbaran
Valores de entrada: linea,idAlbaran
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar el albaran que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarAlbaran(idAlb){
console.log("entro en eliminar albaran");
  Swal.fire({
    title: '¿Estas seguro de eliminar el albarán : '+idAlb+' con todas sus líneas?',
    text: 'Una vez eliminado, no podra recuperarse la información',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
     
                    $.post('phpAlmacen/eliminarAlbaran.php',{
                      id : idAlb
                  },
                      function(datos,estado){
                        console.log(datos);
                      if(datos == 1){
                         
                        Swal.fire(
                          'ELIMINADO',
                          'El albaran ha sido eliminado correctamente.',
                          'success'
                        )
                        obtenerDatosAlbaranes();
                        }
                      } )     
    }
  });
}

/*
Nombre:modificarAlbaran
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar una albaran, que obtiene los datos de los agricultores de la base de datos,
y posteriormente llama a crearHTMLModificarAlbaran para crear dinamicamente el HTML necesario.
*/
function modificarAlbaran(idAlb){
  $.post('phpAlmacen/obtenerUsuariosAgricultores.php',{
     
  },
    function(datos,estado){
       
        var idAlbaran = [] ;
        idAlbaran = datos;
       
        var jsonID = JSON.parse(idAlbaran);
        crearHTMLModificarAlbaran(jsonID,idAlb);

    } )

}

 /*
Nombre:crearHTMLModificarAlbaran
Valores de entrada: jsonAgricultor,idAlb
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML necesario para poder modificar el albaran
 que recibimos en el parametro idAlb. jsonAgricultor lo usamos para crear un select con los agricultores 
 que tenemos en base de datos.
*/
function crearHTMLModificarAlbaran(jsonAgricultor,idAlb){

  var divEAñadir= document.getElementById("editarUsuarioModal");

  jsonAlbaranes.forEach(element=>{

if( element.id == idAlb){
  var dival  = `
 
  <div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">MODIFICAR ALBARÁN</h5>
       
    </div>
    <div class="modal-body">
      <form>
  
        <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Nº Albarán: * </label>
          <input type="text" class="form-control" id="modificarA-nalbaran" value="${idAlb}" readonly>
        </div>
         <div class="form-group">
         <label for="recipient-name" class="col-form-label ">Fecha: * </label>
         <input type="date" class="form-control" id="modificarA-fecha" value="${element.fecha}">
          </div>
          <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Tipo: * </label>
          <select class="browser-default custom-select" id="modificarA-tipoAlbaran" onchange="proveedorTipoModificar(this);">
          `

          if(element.tipo == 'ENTRADA'){

            dival += ` <option selected="true" value="ENTRADA" >ENTRADA</option>`

          }else{
            dival += ` <option  value="ENTRADA" >ENTRADA</option>`
          }

          if(element.tipo == 'SALIDA'){

            dival += ` <option selected="true" value="SALIDA" >SALIDA</option>`

          }else{
            dival += ` <option  value="SALIDA" >SALIDA</option>`
          }

          if(element.tipo == 'ENTRADA USUARIO'){

            dival += ` <option selected="true" value="ENTRADA USUARIO" >ENTRADA USUARIO</option>`

          }else{
            dival += ` <option  value="ENTRADA USUARIO" >ENTRADA USUARIO</option>`
          }

          if(element.tipo == 'SALIDA USUARIO'){

            dival += ` <option selected="true" value="SALIDA USUARIO" >SALIDA USUARIO</option>`

          }else{
            dival += ` <option  value="SALIDA USUARIO" >SALIDA USUARIO</option>`
          }
          
          dival +=`</select>
          </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Proveedor:  </label>`

        if( element.tipo=='ENTRADA' || element.tipo=='SALIDA' ){
        dival +=`<input type="text" class="form-control" id="modificarA-Proveedor" value="${element.proveedor}" >`
        }else{

          dival +=`<input type="hidden" class="form-control" id="modificarA-Proveedor" value="${element.proveedor}" >`
        }

        if( element.tipo=='ENTRADA USUARIO' || element.tipo=='SALIDA USUARIO' ){
          dival +=` <select class="browser-default custom-select" id="modificarAS-Proveedor" >`
        }else{
          dival +=` <select class="browser-default custom-select" id="modificarAS-Proveedor" style="visibility:hidden">`
        }
       
        

        jsonAgricultor.forEach(elementMaterial => {

        if(element.proveedor == elementMaterial.id){
          dival +=   `<option selected="true" value="${elementMaterial.id}">${elementMaterial.id} </option>`
        }else{
          dival +=   `<option value="${elementMaterial.id}">${elementMaterial.id} </option>`
        }

        });


        dival  +=` </select>  </div>

         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Descripción: </label>
        <textarea class="form-control" id="modificarA-descripcion">${element.descripcion}</textarea>
         </div>
         <div class="form-group" id="añadirA-divLineas">
         </div>
         
      </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosAlbaranes()" >Cerrar</button>
      <button type="button" class="btn btn-success" onclick="enviarModificarAlbaran()">Modificar Albarán</button>

    </div>
  </div>
</div>
    
  `
  divEAñadir.innerHTML = dival;

}

  })
}

 /*
Nombre:proveedorTipoModificar
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que nos muestra unos campos o otros para añadir el proveedor segun el tipo de albaran selecionado.
En el caso de que tipo sea ENTRADA o SALIDA, se nos muestra un input donde poder añadir lo que quereamos, ocultando el select con 
los agricultores.En el caso de que tipo sea ENTRADA USUARIO o SALIDA USUARIO, se nos muestra un select con los agricultores, 
y el input donde introducir el proveedor que queramos queda oculto.
*/
function proveedorTipoModificar(tipoAlbaranSeleccionado){
  
  var tipoAl = tipoAlbaranSeleccionado.options[tipoAlbaranSeleccionado.selectedIndex].value;

  if(tipoAl=="ENTRADA" || tipoAl=="SALIDA"){
      document.getElementById('modificarA-Proveedor').type = 'text';

      document.getElementById('modificarAS-Proveedor').style = 'visibility:hidden';

  }

  if(tipoAl=="ENTRADA USUARIO" || tipoAl=="SALIDA USUARIO"){
      document.getElementById('modificarA-Proveedor').type = 'hidden';
      document.getElementById('modificarAS-Proveedor').style = '';

  }

}

 /*
Nombre:enviarModificarAlbaran
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar un albaran,
y guarda los cambios en base de datos.
*/ 
function enviarModificarAlbaran(){

  var idalbaran = document.getElementById('modificarA-nalbaran');
  var fecha = document.getElementById('modificarA-fecha');
  var tipo = document.getElementById('modificarA-tipoAlbaran');
  var provin = document.getElementById('modificarA-Proveedor');
  var provs = document.getElementById('modificarAS-Proveedor');
  var desc = document.getElementById('modificarA-descripcion');


  if(  idalbaran.value !='' && fecha.value !='' && tipo.value !=''){
  
    if( tipo.value =='ENTRADA' || tipo.value=='SALIDA'){
  
      proveedorDesc = provin.value;
    }else{
  
      proveedorDesc = provs.value;

    }
  
    $.post('phpAlmacen/modificarAlbaran.php',{
      idalbaran: idalbaran.value,
      fecha : fecha.value,
      tipo : tipo.value,
      prov : proveedorDesc,
      desc : desc.value
  
    },
        function(datos,estado){
  
        if(datos == 1){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Albaran modificado con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#editarUsuarioModal").modal("hide");
                obtenerDatosAlbaranes();
            }else{
  
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'ERROR',
                text: 'No se ha modificado el albaran.',
                showConfirmButton: false,
                timer: 1500
            })
            }
        })
  
  
  }else{
    
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al modificar el albaran. Exiten campos obligatorios vacios.',
        
      })

    }
}

 /*
Nombre:exportaExcelAlbaranes
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de albaranes al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetAlb para crear el excel con los datos.
*/ 
function exportaExcelAlbaranes(){

  var jsonDataObject = eval(jsonAlbaranes);		
  exportWorksheetAlb(jsonDataObject);
}

 /*
Nombre:exportWorksheetAlb
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetAlb(jsonObject) {
  var myFile = "misAlbaranes.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}

/*
Nombre:miAlmacen
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los materiales de la base de datos,
los alamacena en la variable general y llama a la función crearHMTLMiAlmacen para crear el HTML con dichos datos dinamicamente.
*/
function miAlmacen(){
  $.post('phpAlmacen/obtenerMateriales.php',{
        
  },
    function(datos,estado){
       
        var materiales = [] ;
        materiales = datos;
       
        var jsonMat = JSON.parse(materiales);
         jsonMaterialesGlobal = jsonMat;
         crearHMTLMiAlmacen();

    } )

}

/*
Nombre:crearHMTLMiAlmacen
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de lo materiales,
obtenidos anteriormente y almacenados en la variable general jsonMaterialesGlobal.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHMTLMiAlmacen(){

  // Creo la estructura html.

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-6"> <button class="btn btn-info "  onclick="obtenerDatosAlbaranes()">MIS ALBARANES</button>
        
         <button class="btn btn-primary " data-toggle="modal" data-target="#añadirUsuarioModal" style="background: red;" onclick="añadirMaterial()"> Añadir Nuevo material</button>
         <button class="btn btn-success " onclick="exportarExcelMateriales()">EXCEL</button>
        
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
        <div class=" titulo col-1" >
                <p>Nº</p>
            </div>
            <div class=" titulo col-3" >
                <p>NOMBRE</p>
            </div>
            <div class="titulo col-3" >
            <p>DESCRIPCIÓN</p>
             </div>
            <div class="titulo col-3" >
                <p>CANTIDAD TOTAL</p>
            </div>
          
            </div>
            
        </div>
`

var i=0;
jsonMaterialesGlobal.forEach(element => {

    

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
                                                                    <div class=" datos col-1 align-self-center">
                                                                    <p>${element.id}</p>
                                                                    </div>
                                                                    <div class=" datos col-3 align-self-center">
                                                                    <p>${element.nombre}</p>
                                                                    </div>
                                                                    <div class="datos col-3 align-self-center">
                                                                    <p>${element.descripcion}</p>
                                                                    </div>
                                                                    <div class="datos col-3 align-self-center">
                                                                    <p>${element.cantidadTotal}</p>
                                                                    </div>
                                                                  
                                                                    <div class="datos col-2 align-self-center">
                                                                    <button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editarUsuarioModal" onclick="modificarMaterial(${element.id})"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarMaterial(${element.id})">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                    </svg></button>
                                                                    </div>

                                                                    
                                                                </div>     
                                                    </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">`
                                                        

                                                            dival +=` <div class="row-12">
                                                            <p><strong>CANTIDAD EN MI ALMACEN:</strong> ${element.cantidadEntrada},
                                                            <strong>CANTIDAD ENTREGADA FUERA DEL ALAMCEN:</strong> ${element.cantidadSalida}
                                                            </p>
                                                            
                                                    </div>`
                                                        

                                                            
                                                                
                                                        dival += ` 
                                                        
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
Nombre:exportarExcelMateriales
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de materiales al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetMat para crear el excel con los datos.
*/
function exportarExcelMateriales(){

  var jsonDataObject = eval(jsonMaterialesGlobal);		
  exportWorksheetMat(jsonDataObject);
}

 /*
Nombre:exportWorksheetMat
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetMat(jsonObject) {
  var myFile = "miAlmacen.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}
 /*
Nombre:añadirMaterial
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente en el modal  para añadir un nuevo material.
*/
function añadirMaterial(){


  var divEAñadir= document.getElementById("añadirUsuarioModal");

  var dival  = `

    
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVO MATERIAL</h5>
           
        </div>
        <div class="modal-body">
          <form>
    
             <div class="form-group">
             <label for="recipient-name" class="col-form-label ">Nombre: * </label>
             <input type="text" class="form-control" id="añadirmat-nombre">
              </div>
              
             <div class="form-group">
            <label for="recipient-name" class="col-form-label ">Descripción: * </label>
            <textarea class="form-control" id="añadirmat-descripcion"></textarea>
             </div>
          </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="miAlmacen()" >Cerrar</button>
          <button type="button" class="btn btn-success" onclick="enviarAñadirNuevoMaterial()">Añadir nuevo material</button>

        </div>
      </div>
    </div>

    `
    divEAñadir.innerHTML = dival;
}

 /*
Nombre:enviarAñadirNuevoMaterial
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar un material,
y guarda los cambios en base de datos.
*/ 
function enviarAñadirNuevoMaterial(){
  var nombre = document.getElementById('añadirmat-nombre');
  var desc = document.getElementById('añadirmat-descripcion');

  if(  nombre.value !='' && desc.value !='' ){
  

  $.post('phpAlmacen/añadirMaterial.php',{
    nombre: nombre.value,
    desc : desc.value

  },
      function(datos,estado){

      if(datos == 1){
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Material añadido con exito',
                  showConfirmButton: false,
                  timer: 1500
              })
              miAlmacen();
              $("#añadirUsuarioModal").modal("hide");
          }else{

          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'ERROR',
              text: 'No se ha podido añadir el material.',
              showConfirmButton: false,
              timer: 1500
          })
          }
      })


}else{
  
  console.log("entro en el else ");
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al guardar el material. Exiten campos obligatorios vacios.',
      
    })

  }
}

/*
Nombre:modificarMaterial
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar una albaran, que crea el HTML en el modal necesario para poder
modificar el material cuyo id es el index que le pasamos.
*/
function modificarMaterial(index){

var divEAñadir= document.getElementById("editarUsuarioModal");

jsonMaterialesGlobal.forEach(element=>{

      if( element.id == index){
        var dival  = `
      
        <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">MODIFICAR MATERIAL</h5>
            
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Nombre: * </label>
                <input type="hidden" class="form-control" id="modificarmat-id" value="${element.id}">
                <input type="text" class="form-control" id="modificarmat-nombre" value="${element.nombre}">
              </div>
              
              <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Descripción: *</label>
              <textarea class="form-control" id="modificarmat-descripcion">${element.descripcion}</textarea>
              </div>
              
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="miAlmacen()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarModificarMaterial()">Modificar material</button>

          </div>
        </div>
      </div>
          

        
        `
            
        divEAñadir.innerHTML = dival;
      }
  });
}
 /*
Nombre:enviarModificarMaterial
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar un material,
y guarda los cambios en base de datos.
*/ 
function enviarModificarMaterial(){

  var id = document.getElementById('modificarmat-id');
  var nombre = document.getElementById('modificarmat-nombre');
  var desc = document.getElementById('modificarmat-descripcion');


  if(  nombre.value !='' && desc.value !='' ){
  

  $.post('phpAlmacen/modificarMaterial.php',{
    id: id.value,
    nombre: nombre.value,
    desc : desc.value

  },
      function(datos,estado){


      if(datos == 1){
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Material modificado con exito',
                  showConfirmButton: false,
                  timer: 1500
              })
              miAlmacen();
              $("#editarUsuarioModal").modal("hide");
          }else{

          Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'ERROR',
              text: 'No se ha podido modificar el material.',
              showConfirmButton: false,
              timer: 1500
          })
          }
      })


}else{
  
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al modificar el material. Exiten campos obligatorios vacios.',
      
    })

  }
}

/*
Nombre:eliminarMaterial
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar el material que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarMaterial(index){

  Swal.fire({
    title: '¿Estas seguro de eliminar el material indicado?',
    text: 'Una vez eliminado, no podra recuperarse la información',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      
                    $.post('phpAlmacen/eliminarMaterial.php',{
                      id : index
                  },
                      function(datos,estado){
                        

                      if(datos == 1){
                         
                        Swal.fire(
                          'ELIMINADO',
                          'El material ha sido eliminado correctamente.',
                          'success'
                        )
                        miAlmacen();
                        }
                      } )

                 
    }
  });
}

 /*
Nombre:generarPDFAlbaran
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Funcion que nos genera un PDF con los datos de del albaran que se  indicada en el index.
*/ 
function generarPDFAlbaran( index ){

  var albaranPDF;

  jsonAlbaranes.forEach(elemt => {

    if(elemt.id == index){
      albaranPDF = elemt;
    }
  });

  var doc=new jsPDF();//defecto será portrait (vertical), mm y A4.

  var logo = new Image();
  logo.src = '../img/logo.jpg';
  doc.addImage(logo, 'JPG',110,20,80,20);

  doc.setFontSize(22); // tamaño
  doc.setTextColor(0,85,136); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front

  var text = "ALBARÁN : "+albaranPDF.id;
  doc.text(20,30,text);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,40,"TIPO:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,40,albaranPDF.tipo);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,50,"PROVEEDOR:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,50,albaranPDF.proveedor);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,60,"DESCRIPCIÓN:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  
  var texto = albaranPDF.descripcion
  var sinespacio = texto.split(' ');
  var cantidad = 0;
  var linea = 60;
  var textlinea ="";
  for(var i = 1; i <= sinespacio.length; i++){

      
      var cantidad = cantidad + sinespacio[i-1].length;
      
     
      
      if( cantidad > 50 ){
          doc.text(55,linea,textlinea);
          linea = linea + 10;
         
          cantidad = 0;
          textlinea = sinespacio[i-1]+" ";

      }else{
          textlinea =textlinea+ sinespacio[i-1]+" ";
          
          if( i == sinespacio.length){
              doc.text(55,linea,textlinea);
              linea = linea + 10;
          }
      }

  }

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,linea,"FECHA:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,linea,albaranPDF.fecha);

  linea = linea + 10;
  doc.setFontSize(18); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  var textAlbl = "LÍNEAS DEL ALBARÁN";
  doc.text(20,linea,"LÍNEAS DEL ALBARÁN");
 const textWidth = doc.getTextWidth(text);
 doc.line(20, linea+2,190,linea+2); //LINEA SUBRAYADO   



jsonAlbaranesLineas.forEach( lineaPDF =>{


if(lineaPDF.idAlbaran == albaranPDF.id){

  if(linea + 7 <=270){

  }else{
    doc.addPage();
    linea = 20;
  }
  linea = linea + 10;

  doc.setFontSize(10); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,linea,"LÍNEA:");

  doc.setFontType(""); // tipo front
  doc.text(45,linea,lineaPDF.linea);

  if(linea + 7 <=270){

  }else{
    doc.addPage();
    linea = 20;
  }
  linea = linea + 7;

  doc.setFontSize(10); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,linea,"Material:");

  doc.setFontType(""); // tipo front
  doc.text(45,linea,lineaPDF.nombre);

  if(linea + 7 <=270){

  }else{
    doc.addPage();
    linea = 20;
  }

  linea = linea + 7;

  doc.setFontSize(10); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,linea,"Cantidad:");

  doc.setFontType(""); // tipo front
  doc.text(45,linea,lineaPDF.cantidad);

  if(linea + 7 <=270){

  }else{
    doc.addPage();
    linea = 20;
  }
  linea = linea + 7;

  doc.setFontSize(10); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,linea,"Comentario:");

  
  doc.setFontType(""); // tipo front
 // doc.text(45,linea,lineaPDF.comentario);

  var textoLin = lineaPDF.comentario;
  var sinespacioLin = textoLin.split(' ');
  var cantidad = 0;
  var textlinea ="";
  for(var i = 1; i <= sinespacioLin.length; i++){

      
      var cantidad = cantidad + sinespacioLin[i-1].length;
      
         
      if( cantidad > 80 ){
          doc.text(45,linea,textlinea);

          if(linea + 7 <=270){

          }else{
            doc.addPage();
            linea = 20;
          }
          linea = linea + 7;
         
          cantidad = 0;
          textlinea = sinespacioLin[i-1]+" ";

      }else{
          textlinea =textlinea+ sinespacioLin[i-1]+" ";
          
          if( i == sinespacioLin.length){
              doc.text(45,linea,textlinea);

              if(linea + 7 <=270){

              }else{
                doc.addPage();
                linea = 20;
              }
              linea = linea + 7;
          }
      }

  }
}

})



  doc.save('albaranPDF.pdf');
}