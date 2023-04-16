
var arrayVariedades = []; // variable general donde almacenamos las variedades
var tipoFiltro = "";// variable general donde almacenamos el valor del filtro tipo aplicado

/*
Nombre:obtenerDatosVariedades
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función crearHTMLVariedades para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerDatosVariedades(){
    
    $.post('phpVariedades/obtenerVariedades.php',{
 
    },
      function(datos,estado){
         
          var variedades = [] ;
          variedades = datos;
    
          jsonVariedades = JSON.parse(variedades);
          arrayVariedades = jsonVariedades;
          crearHTMLVariedades();
          
      } );
}

/*
Nombre:crearHTMLVariedades
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de las variedades,
obtenidos anteriormente y almacenados en la variable general arrayVariedades.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLVariedades(){

    // Creo la estructura html.
    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-9">
         <button class="btn btn-primary " data-toggle="modal" data-target="#añadirModal" style="background: red;" onclick="añadirVariedad()"> Añadir Nueva Variedad</button>
         <button class="btn btn-success " onclick="exportarExcelVariedad()">EXCEL</button>
        </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="tipoVariedadFiltro" onchange="changeFiltroTipo(this);">`
        if(tipoFiltro == ""){
            dival +=   ` <option selected="true"  value="" >Todos los tipos</option>`
        }else{
            dival +=   ` <option value="" >Todos los tipos</option>`
        }

        if(tipoFiltro=="Melocotón"){

            dival +=   ` <option selected="true"  value="Melocotón" >Melocotón</option>`
            arrayVariedades= arrayVariedades.filter(e => e.tipo == "Melocotón");

        }else{
            dival +=   ` <option value="Melocotón" >Melocotón</option>`
        }

        if(tipoFiltro=="Nectarina"){

            dival +=   ` <option selected="true"  value="Nectarina" >Nectarina</option>`
            arrayVariedades= arrayVariedades.filter(e => e.tipo == "Nectarina");

        }else{
            dival +=   ` <option value="Nectarina" >Nectarina</option>`
        }

        if(tipoFiltro=="Ciruela"){

            dival +=   ` <option selected="true"  value="Ciruela" >Ciruela</option>`
            arrayVariedades= arrayVariedades.filter(e => e.tipo == "Ciruela");

        }else{
            dival +=   ` <option value="Ciruela" >Ciruela</option>`
        }

            dival +=   ` </select> </div> </div>

    <style>
        .titulo{

        font-weight: bold;
        color: #EC4811;
        font-size:20px;

    }
     </style >
        <div class="row" >
        <div class=" titulo col-2" >
                <p>NOMBRE</p>
            </div>
            <div class=" titulo col-2" >
                <p>TIPO</p>
            </div>
            <div class="titulo col-2" >
            <p>COLOR EXTERIOR</p>
             </div>
            <div class="titulo col-2" >
                <p>COLOR INTERIOR</p>
            </div>
            <div class="titulo col-2" >
                <p>CALIBRE MEDIO</p>
            </div>
            
        </div>
`


var i=0;
arrayVariedades.forEach(element => {


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
                                                                    <p>${element.nombre}</p>
                                                                    </div>
                                                                    <div class=" datos col-2 align-self-center">
                                                                    <p>${element.tipo}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.colorExterior}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.colorInterior}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.calibreMedio}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" onclick="modificarVariedad('${element.nombre}')"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarVariedad('${element.nombre}')">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                    </svg></button>
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
Nombre:añadirVariedad
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir una nueva variedad. 
*/
function añadirVariedad(){

    var divEAñadir= document.getElementById("añadirModal");
    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVA VARIEDAD</h5>
             
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">NOMBRE: * </label>
                <input type="text" class="form-control" id="añadirv-nombre" value="" >
              </div>
               
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Tipo:</label>
                <select class="browser-default custom-select" id="añadirv-tipo" >
                <option  value="" >Seleccione un valor...</option>
                <option  value="Melocotón" >Melocotón</option>
                <option   value="Nectarina" >Nectarina</option>
                <option  value="Ciruela" >Ciruela</option>
                </select>
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Color Exterior:</label>
                <input type="text" class="form-control" id="añadirv-ce" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Color Interior:</label>
                <input type="text" class="form-control" id="añadirv-ci" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Calibre Medio:</label>
                <input type="text" class="form-control" id="añadirv-cm" value="" >
              </div>
               
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosVariedades()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarañadirNuevaVariedad()">Añadir nueva Variedad</button>
  
          </div>
        </div>
      </div>

      `
      divEAñadir.innerHTML = dival;
}

/*
Nombre:enviarañadirNuevaVariedad
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir una nueva variedad,
y guarda los cambios en base de datos.
*/
function enviarañadirNuevaVariedad(){

    
    var nombre = document.getElementById('añadirv-nombre');
    var tipo =  document.getElementById('añadirv-tipo');
    
    var ce =  document.getElementById("añadirv-ce"); 
    var ci =  document.getElementById("añadirv-ci"); 
    var cm =  document.getElementById("añadirv-cm"); 


    if(nombre.value != ""){

        $.post('phpVariedades/añadirNuevaVariedad.php',{
            nombre: nombre.value,
            tipo : tipo.value,
            ce : ce.value,
            ci : ci.value,
            cm : cm.value

          },
              function(datos,estado){

              if(datos == 1){
                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Nueva variedad añadida con exito.',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      obtenerDatosVariedades();
                      $("#añadirModal").modal("hide");
                  }else{

                  Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'ERROR',
                      text: 'No  se ha podido añadir la nueva variedad.',
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
            text: 'No  se ha podido añadir la nueva variedad. Campos obligatorios vacios.',
            showConfirmButton: false,
            timer: 1500
        })

    }
}

/*
Nombre:eliminarVariedad
Valores de entrada: nombre
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar la variedad que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarVariedad(nombre){

    Swal.fire({
        title: '¿Estas seguro de eliminar la variedad:'+nombre+'?',
        text: 'Una vez eliminado, no podra recuperarse la información',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          
                        $.post('phpVariedades/eliminarVariedad.php',{
                          nombre : nombre
                      },
                          function(datos,estado){
                              
                          if(datos == 1){
                             
                            Swal.fire(
                              'ELIMINADO',
                              'La variedad ha sido eliminada correctamente.',
                              'success'
                            )
                            obtenerDatosVariedades();
                            }
                          } )
  
                     
        }
      });
}

/*
Nombre:modificarVariedad
Valores de entrada: nombre
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar una variedad, creando dinamicamente el HTML necesario en el modal.
Mediante el valor nombre, sabemos cual es la variedad a modificar.
*/
function modificarVariedad(nombre){

    jsonVariedades.forEach(element => {

        if(element.nombre == nombre){

            var divEAñadir= document.getElementById("editModal");
    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVA VARIEDAD</h5>
             
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">NOMBRE: * </label>
                <input type="text" class="form-control" id="editarv-nombre" value="${element.nombre}" onlyready>
              </div>
               
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Tipo:</label>
                <select class="browser-default custom-select" id="editarv-tipo" >`

                if(element.tipo == "Melocotón"){

                    dival +=`<option selected="true" value="Melocotón" >Melocotón</option>`

                }else{
                    dival +=`<option value="Melocotón" >Melocotón</option>`
                }

                if(element.tipo == "Nectarina"){

                    dival +=`<option selected="true" value="Nectarina" >Nectarina</option>`

                }else{
                    dival +=`<option value="Nectarina" >Nectarina</option>`
                }

                if(element.tipo == "Ciruela"){

                    dival +=`<option selected="true" value="Ciruela" >Ciruela</option>`

                }else{
                    dival +=`<option value="Ciruela" >Ciruela</option>`
                }
                
                
               dival +=` </select>
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Color Exterior:</label>
                <input type="text" class="form-control" id="editarv-ce" value="${element.colorExterior}" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Color Interior:</label>
                <input type="text" class="form-control" id="editarv-ci" value="${element.colorInterior}" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Calibre Medio:</label>
                <input type="text" class="form-control" id="editarv-cm" value="${element.calibreMedio}" >
              </div>
               
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosVariedades()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarEditarVariedad()">Editar Variedad</button>
  
          </div>
        </div>
      </div>

      `
      divEAñadir.innerHTML = dival;
        }

    });
}

/*
Nombre:enviarEditarVariedad
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar una variedad,
y guarda los cambios en base de datos.
*/
function enviarEditarVariedad(){

    var nombre = document.getElementById('editarv-nombre');
    var tipo =  document.getElementById('editarv-tipo');
    
    var ce =  document.getElementById("editarv-ce"); 
    var ci =  document.getElementById("editarv-ci"); 
    var cm =  document.getElementById("editarv-cm"); 

        $.post('phpVariedades/editarVariedad.php',{
            nombre: nombre.value,
            tipo : tipo.value,
            ce : ce.value,
            ci : ci.value,
            cm : cm.value

          },
              function(datos,estado){


              if(datos == 1){
                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Variedad editada con exito.',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      obtenerDatosVariedades();
                      $("#editModal").modal("hide");
                  }else{

                  Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'ERROR',
                      text: 'No  se ha podido editar la variedad.',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  }
              });


}

/*
Nombre:changeFiltroTipo
Valores de entrada: filtroTipo -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select tipo,
para filtrar nuestro array de variedades por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosVariedades()
*/
function changeFiltroTipo(filtroTipo){

    var pro = filtroTipo.options[filtroTipo.selectedIndex].value;
    tipoFiltro = pro;
    obtenerDatosVariedades();

}

 /*
Nombre:exportarExcelVariedad
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de variedades al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetVar para crear el excel con los datos.
*/ 
function exportarExcelVariedad(){

  var jsonDataObject = eval(arrayVariedades);		
  console.log(jsonDataObject);
  exportWorksheetVar(jsonDataObject);
}

 /*
Nombre:exportWorksheetVar
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetVar(jsonObject) {

  var myFile = "misVariedades.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}