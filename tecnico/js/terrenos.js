var arrayTerrenos = []; // variable general donde almacenamos los terrenos
var agriFilter = "";// variable general donde almacenamos el valor del filtro agricultor aplicado
var varFilter="";// variable general donde almacenamos el valor del filtro variedad aplicado

/*
Nombre:obtenerDatosTerrenos
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los terrenos de la base de datos,
los alamacena en la variable general y llama a la función obtenerFilterAgricultores para obtener mas datos.
*/
function obtenerDatosTerrenos(){
  
    $.post('phpTerrenos/obtenerTerrenos.php',{
 
    },
      function(datos,estado){
         
          var terrenos = [] ;
          terrenos = datos;
    
          jsonTerrenos = JSON.parse(terrenos);
          arrayTerrenos = jsonTerrenos;
          obtenerFilterAgricultores();
          
      } );
}
/*
Nombre:cargarEntradas
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los agricultores de la base de datos,
 y llama a la función obtenerFilterVariedades para obtener mas datos.
*/
function obtenerFilterAgricultores(){

  $.post('phpTerrenos/obtenerAgricultores.php',{
 
  },
    function(datos,estado){
       
        var agricultores = [] ;
        agricultores = datos;
  
        jsonAgricultores = JSON.parse(agricultores);
        obtenerFilterVariedades(jsonAgricultores);
        
    } );
}

/*
Nombre:obtenerFilterVariedades
Valores de entrada: agricultores
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función crearHTMLTerrenos para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerFilterVariedades(agricultores){

     $.post('phpVariedades/obtenerVariedades.php',{
 
     },
       function(datos,estado){
          
           var variedades = [] ;
           variedades = datos;
     
           jsonVariedades = JSON.parse(variedades);
           crearHTMLTerrenos(agricultores,jsonVariedades);
           
       } );
}

/*
Nombre:crearHTMLTerrenos
Valores de entrada: agricultores,variedades
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los terrenos,
obtenidos anteriormente y almacenados en la variable general arrayTerrenos.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLTerrenos(agricultores,variedades){

    // Creo la estructura html.

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-6">
         <button class="btn btn-primary " data-toggle="modal" data-target="#añadirModal" style="background: red;" onclick="añadirTerreno()"> Añadir Nuevo Terreno</button>
         <button class="btn btn-success " onclick="exportarExcelTerreno()">EXCEL</button>
        </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="tipoVariedadFiltro" onchange="changeFiltroTipoVar(this);">`

        if(varFilter == ""){
          dival +=   ` <option selected="true"  value="" >Todos las variedades</option>`
      }else{
          dival +=   ` <option value="" >Todos las variedades</option>`
      }

        variedades.forEach(elementvar => {
          if(varFilter == elementvar.nombre){
            dival += `<option selected="true" value="${elementvar.nombre}">${elementvar.nombre} </option>`
            arrayTerrenos= arrayTerrenos.filter(e => e.variedad == elementvar.nombre );

        }else{
            
            dival += `<option value="${elementvar.nombre}">${elementvar.nombre} </option>`
        }

        });

        dival +=   `</select> </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="tipoAgriFiltro" onchange="changeFiltroTipoAgri(this);">`

        if(agriFilter == ""){
          dival +=   ` <option selected="true"  value="" >Todos los agricultores</option>`
      }else{
          dival +=   ` <option value="" >Todos los agricultores</option>`
      }

        agricultores.forEach(elementAgri => {
          if(agriFilter == elementAgri.id){
            dival += `<option selected="true" value="${elementAgri.id}">${elementAgri.id} </option>`
            arrayTerrenos= arrayTerrenos.filter(e => e.usuario == elementAgri.id );
        }else{
            
            dival += `<option value="${elementAgri.id}">${elementAgri.id} </option>`
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
        <div class=" titulo col-4" >
                <p>PARCCELA</p>
            </div>
            <div class=" titulo col-3" >
                <p>USUARIO</p>
            </div>
            <div class="titulo col-2" >
            <p>VARIEDAD</p>
             </div>
            <div class="titulo col-1" >
                <p>TAMAÑO</p>
            </div>
            
        </div>
`


var i=0;
arrayTerrenos.forEach(element => {


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
                                                                    <div class=" datos col-4 align-self-center">
                                                                    <p>${element.parcela}</p>
                                                                    </div>
                                                                    <div class=" datos col-3 align-self-center">
                                                                    <p>${element.usuario}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.variedad}</p>
                                                                    </div>
                                                                    <div class="datos col-1 align-self-center">
                                                                    <p>${element.tamaño}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" onclick="modificarTerreno('${element.id}')"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarTerreno('${element.id}')">
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
Nombre:añadirTerreno
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los agricultores de la base de datos,
Posteriormente  llama a la función obtenerVariedades para obtener mas datos.
*/
function añadirTerreno(){

    $.post('phpTerrenos/obtenerAgricultores.php',{
 
    },
      function(datos,estado){
         
          var agricultores = [] ;
          agricultores = datos;
    
          jsonAgricultores = JSON.parse(agricultores);
          obtenerVariedades(jsonAgricultores);
          
      } );

}

/*
Nombre:obtenerVariedades
Valores de entrada: agricultores
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función crearHTMLNuevoTerreno para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerVariedades(agricultores){

     $.post('phpVariedades/obtenerVariedades.php',{
 
     },
       function(datos,estado){
          
           var variedades = [] ;
           variedades = datos;
     
           jsonVariedades = JSON.parse(variedades);         
           crearHTMLNuevoTerreno(agricultores,jsonVariedades);
           
       } );
}

/*
Nombre:crearHTMLnuevaEntradas
Valores de entrada: agricultores,variedades
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir un nuevo terreno. 
agricultores y variedades lo usamos para crear los select con los agricultores y variedades existentes en la base de datos.
*/
function crearHTMLNuevoTerreno(agricultores,variedades){

    var divEAñadir= document.getElementById("añadirModal");

    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVO TERRENO</h5>
             
          </div>
          <div class="modal-body">
            <form>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">POLÍGONO: * </label>
                <input type="text" class="form-control" id="añadirt-pol" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">PARCELA: * </label>
                <input type="text" class="form-control" id="añadirt-par" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">SECCIÓN: * </label>
                <input type="text" class="form-control" id="añadirt-sec" value="" >
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">PROVINCIA: * </label>
                <input type="text" class="form-control" id="añadirt-pro" value="" >
              </div>
               
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">VARIEDAD:</label>
                <select class="browser-default custom-select" id="añadirt-var" >
                <option  value="" >Seleccione un valor...</option>`

               
                
                variedades.forEach(elementVariedad => {

                    
                      dival +=   `<option value="${elementVariedad.nombre}">${elementVariedad.nombre} </option>`
                    });

               dival+=` </select>
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">AGRICULTOR:</label>
                <select class="browser-default custom-select" id="añadirt-agri" >
                <option  value="" >Seleccione un valor...</option>`

                agricultores.forEach(elementAgricultor => {

                    
                    dival +=   `<option value="${elementAgricultor.id}">${elementAgricultor.id} </option>`
                  });
                 dival+=` </select>
                </div><div class="form-group">
                <label for="recipient-name" class="col-form-label ">TAMAÑO:</label>
                <input type="number" step="0.01" class="form-control" id="añadirt-tam" value="" >
              </div>
              
               
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosTerrenos()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarañadirNuevoTerreno()">Añadir nuevo Terreno</button>
  
          </div>
        </div>
      </div>

      `
      divEAñadir.innerHTML = dival;

}

/*
Nombre:enviarañadirNuevoTerreno
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir un nuevo terreno,
y guarda los cambios en base de datos.
*/
function enviarañadirNuevoTerreno(){

    var poligono = document.getElementById('añadirt-pol');
    var parcela =  document.getElementById('añadirt-par');
    var sec = document.getElementById('añadirt-sec');
    var prov =  document.getElementById('añadirt-pro');
    
    var agricultor =  document.getElementById('añadirt-agri'); 
    var variedad =  document.getElementById('añadirt-var'); 
    var tamaño =  document.getElementById('añadirt-tam'); 


    if(poligono.value != "" || parcela.value !="" || sec.value !="" || prov.value !=""){

        $.post('phpTerrenos/añadirNuevoTerreno.php',{
            parcela: poligono.value+"-"+parcela.value+"-"+sec.value+"-"+prov.value,
            agricultor : agricultor.value,
            variedad : variedad.value,
            tamaño : tamaño.value

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
                    obtenerDatosTerrenos();
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
            text: 'No  se ha podido añadir el nuevo terreno. Campos obligatorios vacios.',
            showConfirmButton: false,
            timer: 1500
        })

    }
}

/*
Nombre:eliminarTerreno
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar el terreno que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarTerreno(index){

    Swal.fire({
        title: '¿Estas seguro de eliminar el terreno?',
        text: 'Una vez eliminado, no podra recuperarse la información',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          
                        $.post('phpTerrenos/eliminarTerreno.php',{
                          id : index
                      },
                          function(datos,estado){
                              
                          if(datos == 1){
                             
                            Swal.fire(
                              'ELIMINADO',
                              'El terreno ha sido eliminado correctamente.',
                              'success'
                            )
                            obtenerDatosTerrenos();
                            }
                          } )
  
                     
        }
      });
}

/*
Nombre:modificarTerreno
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función:Función que obtiene los datos de los agricultores de la base de datos,
Posteriormente  llama a la función obtenerVariedadesEditar para obtener mas datos.
*/
function modificarTerreno(index){

$.post('phpTerrenos/obtenerAgricultores.php',{
 
},
  function(datos,estado){
     
      var agricultores = [] ;
      agricultores = datos;

      jsonAgricultores = JSON.parse(agricultores);
      
      console.log(jsonAgricultores);
      obtenerVariedadesEditar(index,jsonAgricultores);
      
  } );

}

/*
Nombre:obtenerVariedadesEditar
Valores de entrada: index, agricultores
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función modificarTerrenoHTML para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerVariedadesEditar(index, agricultores){

    $.post('phpVariedades/obtenerVariedades.php',{

    },
      function(datos,estado){
         
          var variedades = [] ;
          variedades = datos;
    
          jsonVariedades = JSON.parse(variedades);
          modificarTerrenoHTML(index,agricultores,jsonVariedades);
          
      } );
}

/*
Nombre:modificarTerrenoHTML
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar un terreno, creando dinamicamente el HTML necesario en el modal.
Mediante el valor index, sabemos cual es el id de la entrada a modificar.
*/
function modificarTerrenoHTML(index,agricultores,variedades){

    arrayTerrenos.forEach(element => {

        if(element.id == index){

            var divEAñadir= document.getElementById("editModal");
    
    var dival  = `
  
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EDITAR TERRENO</h5>
             
          </div>
          <div class="modal-body">
            <form>
            <div class="form-group">
            
                <input type="hidden" class="form-control" id="editart-id" value="${element.id}" readonly>
              </div>
        
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">PARCELA: * </label>
                <input type="text" class="form-control" id="editart-parcela" value="${element.parcela}" readonly>
              </div>
               
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">VARIEDAD:</label>
                <select class="browser-default custom-select" id="editart-variedad" >`

                variedades.forEach(elementv => {

                    if(elementv.nombre == element.variedad){
                        dival +=`<option selected="true" value="${elementv.nombre}" >${elementv.nombre}</option>`

                    }else{
                        dival +=`<option value="${elementv.nombre}" >${elementv.nombre}</option>`
                    }

                });
                
                dival +=` </select>
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">AGRICULTOR:</label>
                <select class="browser-default custom-select" id="editart-agri" >`
                agricultores.forEach(elementa => {

                    if(elementa.id == element.agricultor){
                        dival +=`<option selected="true" value="${elementa.id}" >${elementa.id}</option>`

                    }else{
                        dival +=`<option value="${elementa.id}" >${elementa.id}</option>`
                    }

                });

               dival +=` </select>
                </div>
                <div class="form-group">
                <label for="recipient-name" class="col-form-label ">TAMAÑO:</label>
                <input  type="number" step="0.01" class="form-control" id="editart-tam" value="${element.tamaño}" >
              </div>
              
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="obtenerDatosTerrenos()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarEditarTerreno()">Editar Terreno</button>
  
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
Nombre:enviarEditarTerreno
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar un terreno,
y guarda los cambios en base de datos.
*/
function enviarEditarTerreno(){

    var id = document.getElementById('editart-id');
    var parcela =  document.getElementById('editart-parcela');
    
    var variedad =  document.getElementById("editart-variedad"); 
    var agri =  document.getElementById("editart-agri"); 
    var tam =  document.getElementById("editart-tam"); 

    $.post('phpTerrenos/editarTerrenos.php',{
        id: id.value,
        parcela : parcela.value,
        variedad : variedad.value,
        agri : agri.value,
        tam : tam.value

      },
          function(datos,estado){


          if(datos == 1){
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Terreno editado con exito.',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  obtenerDatosTerrenos();
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
Nombre:changeFiltroTipoVar
Valores de entrada: filtroVariedad -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select variedad,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosTerrenos()
*/
function changeFiltroTipoVar(filtroVariedad){

  var pro = filtroVariedad.options[filtroVariedad.selectedIndex].value;
  varFilter = pro;
  obtenerDatosTerrenos();
}

/*
Nombre:changeFiltroTipoAgri
Valores de entrada: filtroAgri -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select agricultor,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosTerrenos()
*/
function changeFiltroTipoAgri(filtroAgri){

  var pro = filtroAgri.options[filtroAgri.selectedIndex].value;
  agriFilter = pro;
  obtenerDatosTerrenos();
}

 /*
Nombre:exportarExcelTerreno
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de terrenos al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetTer para crear el excel con los datos.
*/ 
function exportarExcelTerreno(){

  var jsonDataObject = eval(arrayTerrenos);		
  exportWorksheetTer(jsonDataObject);
}

 /*
Nombre:exportWorksheetTer
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetTer(jsonObject) {

  var myFile = "misTerrenos.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}