var arrayTratamientos = [];// variable general donde almacenamos los tratamientos
var terrenoFilter="";// variable general donde almacenamos el valor del filtro terreno aplicado

/*
Nombre:obtenerDatosTratamientos
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los tratamientos de la base de datos,
los alamacena en la variable general y llama a la función obtenerFilterTerrenos para obtener mas datos.
*/
function obtenerDatosTratamientos(){

$.post('phpTratamientos/obtenerTratamientos.php',{
 
},
  function(datos,estado){
     
      var tratamientos = [] ;
      tratamientos = datos;

      jsonTratamientos = JSON.parse(tratamientos);
      arrayTratamientos = jsonTratamientos;
      obtenerFilterTerrenos();
  } );

}

/*
Nombre:obtenerFilterTerrenos
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los terrenos de la base de datos
 y llama a la función crearHTMLTratamientos para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerFilterTerrenos(){

$.post('phpTerrenos/obtenerTerrenos.php',{
 
},
  function(datos,estado){
     
      var terrenos = [] ;
      terrenos = datos;

      jsonTerrenos = JSON.parse(terrenos);
      crearHTMLTratamientos(jsonTerrenos);
  } );
}

/*
Nombre:crearHTMLTratamientos
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los tratamientos,
obtenidos anteriormente y almacenados en la variable general arrayTratamientos.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLTratamientos(terrenos){
// Creo la estructura html.

let divAlmacen = document.getElementById('contenedorPrincipal');
var dival =`
<style>
.marginz{
    
    margin-bottom: 10px;
}
</style>
<div class ="row marginz">
    <div class="col-8">
     <button class="btn btn-primary " data-toggle="modal" data-target="#añadirModal" style="background: red;" onclick="añadirTratamiento()"> Añadir Nuevo Tratamientos</button>
     <button class="btn btn-success " onclick="exportarExcelTratamientos()">EXCEL</button>
    </div>
    <div class="col-4"> 
    <select class="browser-default custom-select" id="tipoTerrenoFiltro" onchange="changeFiltroTipoTerreno(this);">`

    if(terrenoFilter == ""){
      dival +=   ` <option selected="true"  value="" >Todos los terrenos</option>`
  }else{
      dival +=   ` <option value="" >Todos los terrenos</option>`
  }


  terrenos.forEach(elementvar => {
      if(terrenoFilter == elementvar.id){
        dival += `<option selected="true" value="${elementvar.id}">${elementvar.parcela} (${elementvar.variedad}) </option>`
        arrayTratamientos= arrayTratamientos.filter(e => e.localizacion == elementvar.id );

    }else{
        
        dival += `<option value="${elementvar.id}">${elementvar.parcela} (${elementvar.variedad})</option>`
    }

    });

    
    dival +=`</select> </div> </div>
    <style>
    .titulo{

    font-weight: bold;
    color: #EC4811;
    font-size:20px;

}
 </style >
    <div class="row" >
    <div class=" titulo col-2" >
            <p>TERRENO</p>
        </div>
        <div class=" titulo col-2" >
            <p>FECHA</p>
        </div>
        <div class="titulo col-2" >
        <p>TIPO</p>
         </div>
        <div class="titulo col-2" >
            <p>COMPUESTO</p>
        </div>
        <div class="titulo col-2" >
            <p>ESTADO</p>
        </div>
        
    </div>
`


var i=0;
arrayTratamientos.forEach(element => {


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
                                                                <div class=" datos col-2 align-self-center">
                                                                <p>${element.parcela} (${element.variedad})</p>
                                                                </div>
                                                                <div class=" datos col-2 align-self-center">
                                                                <p>${element.fecha}</p>
                                                                </div>
                                                                <div class="datos col-2 align-self-center">
                                                                <p>${element.tipo}</p>
                                                                </div>
                                                                <div class="datos col-2 align-self-center">
                                                                <p>${element.compuesto}</p>
                                                                </div>
                                                                <div class="datos col-2 align-self-center">
                                                                <p>${element.estado}</p>
                                                                </div>
                                                                <div class="datos col-2 align-self-center">
                                                                <button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                    </svg></button>
                                                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" onclick="modificarTratamiento('${element.localizacion}','${element.fecha}')"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                </svg></button>
                                                                <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarTratamiento('${element.localizacion}','${element.fecha}')">
                                                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                </svg></button>
                                                                </div>

                                                                
                                                            </div>    
                                                            </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">
                                                            <div class="col">
                                                                <p><strong>COMENTARIO:</strong> ${element.comentario}</p>
                                                                
                                                        </div>
                                                    </div>
                                                </div>
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
Nombre:añadirTratamiento
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los terrenos de la base de datos,
Luego llama a la función crearHTMLNuevoTratamiento, para crear dinamicamente la representacion HTML para añadir un nuevo tratamiento.
*/
function añadirTratamiento(){
    $.post('phpTerrenos/obtenerTerrenos.php',{
 
    },
      function(datos,estado){
         
          var terrenos = [] ;
          terrenos = datos;
    
          jsonTerrenos = JSON.parse(terrenos);
          crearHTMLNuevoTratamiento(jsonTerrenos);
          
      } );
}

/*
Nombre:crearHTMLNuevoTratamiento
Valores de entrada: terrenos
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir un nuevo tratamiento. 
terrenos lo usamos para crear un select con los terrenos que tenemos en base de datos.
*/
function crearHTMLNuevoTratamiento(terrenos){

    var divEAñadir= document.getElementById("añadirModal");
   
    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVO TRATAMIENTO</h5>
             
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">FECHA: * </label>
                <input type="date" class="form-control" id="añadirt-fech" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">TIPO: * </label>
                <input type="text" class="form-control" id="añadirt-tipo" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">COMPUESTO: * </label>
                <input type="text" class="form-control" id="añadirt-com" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">ESTADO:</label>
                <input type="text" class="form-control" id="añadirt-estado" value="" >
              </div>
               
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">TERRENO: * </label>
                <select class="browser-default custom-select" id="añadirt-terreno" >
                <option  value="" >Seleccione un valor...</option>`

               
                
                terrenos.forEach(elementVariedad => {

                    
                      dival +=   `<option value="${elementVariedad.id}">${elementVariedad.parcela} (${elementVariedad.variedad})</option>`
                    });

            
                 dival+=` </select>
                </div><div class="form-group">
                <label for="recipient-name" class="col-form-label ">COMENTARIO:</label>
                <textarea class="form-control" id="añadirt-comentario"></textarea>
              </div>
              
               
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosTratamientos()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarañadirNuevoTratamiento()">Añadir nuevo Tratamiento</button>
  
          </div>
        </div>
      </div>

      `

      divEAñadir.innerHTML = dival;

}

/*
Nombre:enviarañadirNuevoTratamiento
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir el  nuevo tratamiento,
y guarda los cambios en base de datos.
*/
function enviarañadirNuevoTratamiento(){

    var fecha = document.getElementById('añadirt-fech');
    var tipo =  document.getElementById('añadirt-tipo');
    var compuesto = document.getElementById('añadirt-com');
    var estado =  document.getElementById('añadirt-estado');
    
    var localizacion =  document.getElementById('añadirt-terreno'); 
    var comentario =  document.getElementById('añadirt-comentario'); 
   
    if(fecha.value != "" || tipo.value !="" || compuesto.value !="" || localizacion.value !=""){

        $.post('phpTratamientos/añadirNuevoTratamiento.php',{
            fecha: fecha.value,
            tipo : tipo.value,
            compuesto : compuesto.value,
            estado : estado.value,
            localizacion : localizacion.value,
            comentario : comentario.value

          },
          function(datos,estado){

            if(datos == 1){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Nuevo tratamiento añadido con exito.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    obtenerDatosTratamientos();
                    $("#añadirModal").modal("hide");
                }else{

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'ERROR',
                    text: 'No  se ha podido añadir el nuevo tratamiento.',
                    showConfirmButton: false,
                    timer: 1500
                })
                }
            });


    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'ERROR',
            text: 'No  se ha podido añadir el nuevo tratamiento. Campos obligatorios vacios.',
            showConfirmButton: false,
            timer: 1500
        })

    }

}

/*
Nombre:eliminarTratamiento
Valores de entrada: index,fecha
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar el tratamiento que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarTratamiento(index, fecha){


    Swal.fire({
        title: '¿Estas seguro de eliminar el tratamiento?',
        text: 'Una vez eliminado, no podra recuperarse la información',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          
                        $.post('phpTratamientos/eliminarTratamiento.php',{
                          id : index,
                          fecha : fecha
                      },
                          function(datos,estado){
                              
                          if(datos == 1){
                             
                            Swal.fire(
                              'ELIMINADO',
                              'El tratamiento ha sido eliminado correctamente.',
                              'success'
                            )
                            obtenerDatosTratamientos();
                            }
                          } )
  
                     
        }
      });

}

/*
Nombre:modificarTratamiento
Valores de entrada: index,fecha
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar un tratamiento, creando dinamicamente el HTML necesario en el modal.
Mediante el valor index y fecha, sabemos cual es el id de la entrada a modificar.
*/
function modificarTratamiento(index,fecha){


    console.log(arrayTratamientos);
    
    arrayTratamientos.forEach(element => {

        if(element.localizacion == index && element.fecha == fecha){

            var divEAñadir= document.getElementById("editModal");
    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EDITAR TRATAMIENTO</h5>
             
          </div>
          <div class="modal-body">
            <form>
            
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">TERRENO: * </label>
                <input type="hidden" class="form-control" id="editart-terreno" value="${element.localizacion}" readonly>
                <select class="browser-default custom-select" id="añadirt-terreno" >
                <option  value="" >${element.parcela} (${element.variedad})</option>
                </select>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">FECHA: * </label>
                <input type="text" class="form-control" id="editart-fecha" value="${element.fecha}" readonly>
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">TIPO: * </label>
                <input type="text" class="form-control" id="editart-tipo" value="${element.tipo}" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">COMPUESTO: * </label>
                <input type="text" class="form-control" id="editart-compu" value="${element.compuesto}" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">ESTADO: </label>
                <input type="text" class="form-control" id="editart-est" value="${element.estado}" >
              </div>
            
              <div class="form-group">
              <label for="recipient-name" class="col-form-label ">COMENTARIO:</label>
              <textarea class="form-control" id="editart-comentario">${element.comentario}</textarea>
                
              
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosTratamientos()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarEditarTratamientos()">Editar Tratamiento</button>
  
          </div>
        </div>
      </div>

      `
      console.log(dival);
      divEAñadir.innerHTML = dival;
        }

    });
}

/*
Nombre:enviarEditarTratamientos
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos modificados en el modal para actualizar el tratamiento,
y guarda los cambios en base de datos.
*/
function enviarEditarTratamientos(){
    var localizacion = document.getElementById('editart-terreno');
    var fecha =  document.getElementById('editart-fecha');
    
    var tipo =  document.getElementById("editart-tipo"); 
    var compu =  document.getElementById("editart-compu"); 
    var est =  document.getElementById("editart-est"); 
    var comentario =  document.getElementById("editart-comentario"); 

    $.post('phpTratamientos/editarTratamientos.php',{
        localizacion: localizacion.value,
        fecha : fecha.value,
        tipo : tipo.value,
        compu : compu.value,
        est : est.value,
        comentario : comentario.value

      },
          function(datos,estado){

          console.log(datos);

          if(datos == 1){
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Tratamiento editado con exito.',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  obtenerDatosTratamientos();
                  $("#editModal").modal("hide");
              }else{

              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'ERROR',
                  text: 'No  se ha podido editar el terreno.',
                  showConfirmButton: false,
                  timer: 1500
              })
              }
          });
}

/*
Nombre:changeFiltroTipoTerreno
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select terrenos,
para filtrar nuestro array de tratamientos por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosTratamientos()
*/
function changeFiltroTipoTerreno( terreno ){

  var pro = terreno.options[terreno.selectedIndex].value;
  terrenoFilter = pro;
  obtenerDatosTratamientos();
}

/*
Nombre:exportaExcelTratamientos
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de tratamientos al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetTra para crear el excel con los datos.
*/ 
function exportarExcelTratamientos(){

  var jsonDataObject = eval(arrayTratamientos);		
  exportWorksheetTra(jsonDataObject);
}

 /*
Nombre:exportWorksheetTra
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetTra(jsonObject) {
  var myFile = "misTratamientos.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}