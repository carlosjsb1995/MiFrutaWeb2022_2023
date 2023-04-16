
var arrayEntradas;// variable general donde almacenamos las entradas
 var filterVar=""; // variable general donde almacenamos el valor del filtro variedad aplicado
 var agriFilter="";// variable general donde almacenamos el valor del filtro agricultor aplicado
 var camFilter="";// variable general donde almacenamos el valor del filtro campaña aplicado

/*
Nombre:cargarEntradas
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las entradas de la base de datos,
los alamacena en la variable general y llama a la función obtenerVariedades para obtener mas datos.
*/
function cargarEntradas(){

   //Obtenemos los datos de las entradas.
   $.post('phpEntradas/obtenerEntradas.php',{
 
   },
     function(datos,estado){
        
         var entradas = [];
         entradas = datos;
         jsonEntradas = JSON.parse(entradas);
         arrayEntradas = jsonEntradas;
         obtenerVariedades();
       
     });
}

/*
Nombre:obtenerVariedades
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función obtenerAgricultores para obtener mas datos necesarios para la repesentacion de las entradas.
*/
function obtenerVariedades(){

   //Obtenemos los datos de las variedades.
   $.post('phpEntradas/obtenerVariedades.php',{
 
   },
     function(datos,estado){
        
         var variedades = [] ;
         variedades = datos;

         jsonVariedades = JSON.parse(variedades);
         obtenerAgricultores(jsonVariedades);
       
     });

}

/*
Nombre:obtenerAgricultores
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los agricultores de la base de datos
 y llama a la función función obtenerCampana para obtener mas datos necesarios para la repesentacion de las entradas
*/
function obtenerAgricultores(jsonVariedades){

  //Obtenemos los datos de los agricultores.
  $.post('phpEntradas/obtenerAgricultores.php',{

  },
    function(datos,estado){
       
        var agricultores = [] ;
        agricultores = datos;

        jsonAgricultores = JSON.parse(agricultores);
        obtenerCampana(jsonVariedades,jsonAgricultores);
      
    });

}

/*
Nombre:obtenerCampana
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las campañas de la base de datos
 y llama a la función crearHTMLEntradas para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerCampana(jsonVariedades,jsonAgricultores){

  //Obtenemos los datos de las entradas.
  $.post('phpEntradas/obtenerCampana.php',{

  },
    function(datos,estado){
       
        var campana = [] ;
        campana = datos;

        jsonCampana = JSON.parse(campana);
        crearHTMLEntradas(jsonVariedades,jsonAgricultores,jsonCampana);
      
    });
}

/*
Nombre:crearHTMLEntradas
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de las entradas,
obtenidos anteriormente y almacenados en la variable general arrayEntradas.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLEntradas(jsonVariedades,jsonAgricultores,jsonCampana){

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
        <div class="col-3"> <button class="btn btn-primary " data-toggle="modal" data-target="#añadirUsuarioModal" style="background: red;" onclick="añadirEntrada()"> Añadir Nueva Entrada</button>
        
        <button class="btn btn-success " onclick="exportaExcel()"> EXCEL </button>
        </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="rol"  onchange="getValueVariedad(this);">`
        if(filterVar == ""){
          dival +=   ` <option selected="true"  value="" >Todos las variedades</option>`
      }else{
          dival +=   ` <option value="" >Todos las variedades</option>`
      }

      jsonVariedades.forEach(elementvar => {
          if(filterVar == elementvar.variedad){
            dival += `<option selected="true" value="${elementvar.variedad}">${elementvar.variedad} </option>`
            arrayEntradas= arrayEntradas.filter(e => e.variedad == elementvar.variedad );

        }else{
            
            dival += `<option value="${elementvar.variedad}">${elementvar.variedad} </option>`
        }

        });
                    

        dival +=   `   </select>
</div>
<div class="col-3"> 
        <select class="browser-default custom-select" id="tipoAgriFiltro" onchange="changeFiltroTipoAgri(this);">`

        if(agriFilter == ""){
          dival +=   ` <option selected="true"  value="" >Todos los agricultores</option>`
      }else{
          dival +=   ` <option value="" >Todos los agricultores</option>`
      }

        jsonAgricultores.forEach(elementAgri => {
          if(agriFilter == elementAgri.id){
            dival += `<option selected="true" value="${elementAgri.id}">${elementAgri.id} </option>`
            arrayEntradas= arrayEntradas.filter(e => e.usuario == elementAgri.id );
        }else{
            
            dival += `<option value="${elementAgri.id}">${elementAgri.id} </option>`
        }

        });

        dival +=`</select> </div>
        <div class="col-3"> 
        <select class="browser-default custom-select" id="rol"  onchange="changeFiltroTipoCampana(this);">`
        if(camFilter == ""){
          dival +=   ` <option selected="true"  value="" >Todos las campañas</option>`
      }else{
          dival +=   ` <option value="" >Todos las campañas</option>`
      }

      jsonCampana.forEach(elementvar => {
          if(camFilter == elementvar.ano){
            dival += `<option selected="true" value="${elementvar.ano}">${elementvar.ano} </option>`
            arrayEntradas= arrayEntradas.filter(e => e.campana == elementvar.ano );

        }else{
            
            dival += `<option value="${elementvar.ano}">${elementvar.ano} </option>`
        }

        });
                    

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
            <div class=" titulo col-2" >
                <p>Agricultor</p>
            </div>
            <div class="titulo col-2" >
                <p>Variedad</p>
            </div>
            <div class="titulo col-2" >
                <p>Kilos</p>
            </div>
            <div class="titulo col-2" >
                <p>Fecha</p>
            </div>
            <div class="titulo col-2">
                <p>Valido %</p>
            </div>
            
        </div>
`


var i=0;
arrayEntradas.forEach(element => {


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
                                                                    <p>${element.usuario}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.variedad}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.kilos} Kg</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.fecha}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.porcentajeBueno} %</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <button type="button" class="btn btn-dark" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editarUsuarioModal" onclick="modificarEntrada('${element.id}')"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                    </svg></button>
                                                                    <button type="button" class="btn btn-danger"><svg width="1.2em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="eliminarEntrada('${element.id}')">
                                                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                                                    </svg></button>
                                                                    </div>

                                                                    
                                                                </div>     
                                                    </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">
                                                            <div class="col-12">
                                                                <p><strong>Parcela:</strong> ${element.parcela}</p>
                                                                <p><strong>Inutiles:</strong> ${element.inutiles} Kg</p>
                                                                <p><strong>Calibre fuera de rango:</strong> ${element.pequeñas} Kg</p>
                                                                <p><strong>Azucar:</strong> ${element.azucar}</p>
                                                                <p><strong>Presión:</strong> ${element.presion}</p>
                                                                <p><strong>Calibre medio:</strong> ${element.calibremedio} cm</p>
                                                        </div>
                                                        <div class="row-12">
                                                       
                                                        <div class="col-12 align-self-center">
                                                      
                                                        <button type="button" class="btn btn-warning"  onclick="generarPDFEntrada(${element.id})" >Generar PDF</button>
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
Nombre:añadirEntrada
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las parcelas de la base de datos,
Posteriormente  llama a la función crearHTMLnuevaEntradas, pasandole los datos de las parcelas,
para crear dinamicamente la representacion HTML para añadir una nueva entrada.
*/
function añadirEntrada(){

//Obtenemos los datos de las parcelas.
$.post('phpEntradas/obtenerParcelas.php',{
 
},
  function(datos,estado){
     
      var terrenos = [] ;
      terrenos = datos;

      jsonTerrenos = JSON.parse(terrenos);
      crearHTMLnuevaEntradas(jsonTerrenos);
  });

}

/*
Nombre:crearHTMLnuevaEntradas
Valores de entrada: jsonTerrenos
Valores de salida: Ninguno
Descripción de la función:  Se crea dinamicamente el HTML en el modal necesario para poder añadir una nueva entrada. 
jsonTerrenos lo usamos para crear un select con los terrenos que tenemos en base de datos.
*/
function crearHTMLnuevaEntradas(jsonTerrenos){
    var divEAñadir= document.getElementById("añadirUsuarioModal");
  
    
    var dival  = `
  
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">AÑADIR NUEVA ENTRADA</h5>
             
          </div>
          <div class="modal-body">
            <form>
            <div class="form-group">
            <label for="recipient-name" class="col-form-label ">selecciona los datos de procedencia: * </label>
            <select class="browser-default custom-select" id="parcelaSelect" onchange="valoresEntrada(this);">
            <option selected="true"  value="todos" >selecciona una opción</option>`
  
            console.log("imprimo el array de parcelas de nuevo");
            console.log(jsonTerrenos);
            jsonTerrenos.forEach(element => {
              console.log(element);
            
              dival +=   `<option value="${element.id}">${element.parcela}/${element.usuario}/${element.variedad} </option>`
            });
        

    
            dival +=   `   </select>
                      </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Usuario: * </label>
                <input type="text" class="form-control" id="añadir-usuarioEntrada" readonly>
              </div>

              <div class="form-group">
                <label for="recipient-name" class="col-form-label ">Variedad: * </label>
                <input type="text" class="form-control" id="añadir-variedadEntrada" readonly>
              </div>

              <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Parcela: * </label>
              <input type="text" class="form-control" id="añadir-variedadParcela" readonly>
               </div>
               <div class="form-group">
               <label for="recipient-name" class="col-form-label ">Fecha: * </label>
               <input type="date" class="form-control" id="añadir-fechaEntrada">
                </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Kilos: * </label>
              <input type="text" class="form-control" id="añadir-kilosEntrada">
               </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Inutiles: * </label>
              <input type="text" class="form-control" id="añadir-inutilesEntrada">
               </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Calibre fuera de rango: * </label>
              <input type="text" class="form-control" id="añadir-pequeñasEntrada">
               </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Azucar:  </label>
              <input type="text" class="form-control" id="añadir-azucarEntrada">
               </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Presión:  </label>
              <input type="text" class="form-control" id="añadir-presionEntrada">
               </div>
               <div class="form-group">
              <label for="recipient-name" class="col-form-label ">Calibre medio: </label>
              <input type="text" class="form-control" id="añadir-calibreMedioEntrada">
               </div>


  
              

  
              
            </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cargarEntradas()" >Cerrar</button>
            <button type="button" class="btn btn-success" onclick="enviarAñadirNuevaEntrada()">Añadir nueva entrada</button>
  
          </div>
        </div>
      </div>
    
  
  
      
      `
      divEAñadir.innerHTML = dival;
}

/*
Nombre:enviarAñadirNuevaEntrada
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para añadir el nueva entrada,
y guarda los cambios en base de datos.
*/
function enviarAñadirNuevaEntrada(){

 
  var parcela = document.getElementById('parcelaSelect');
  var kilos = document.getElementById('añadir-kilosEntrada');
  var fecha = document.getElementById('añadir-fechaEntrada');
  var inutiles = document.getElementById('añadir-inutilesEntrada');

  var peque = document.getElementById('añadir-pequeñasEntrada');
  var azucar = document.getElementById('añadir-azucarEntrada');
  var presion = document.getElementById('añadir-presionEntrada');
  var calimed = document.getElementById('añadir-calibreMedioEntrada');

if( parcela.value != '' && kilos.value !='' && fecha.value !='' && inutiles.value !='' && peque.value !=''){

  console.log("entro en el if ");
                  $.post('phpEntradas/añadirEntrada.php',{
                    parcela: parcela.value,
                    kilos : kilos.value,
                    fecha : fecha.value,
                    inutiles : inutiles.value,
                    peque : peque.value,
                    azucar : azucar.value,
                    presion : presion.value,
                    calimed : calimed.value

                  },
                      function(datos,estado){

                      console.log(datos);

                      if(datos == 1){
                              Swal.fire({
                                  position: 'center',
                                  icon: 'success',
                                  title: 'Entrada guardada con exito',
                                  showConfirmButton: false,
                                  timer: 1500
                              })
                              cargarEntradas();
                              $("#añadirUsuarioModal").modal("hide");

                          }else{

                          Swal.fire({
                              position: 'center',
                              icon: 'error',
                              title: 'ERROR',
                              text: 'No se ha guardado la entrada.',
                              showConfirmButton: false,
                              timer: 1500
                          })
                          }
                      })
  }else{

      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al guardar la entrada. Exiten campos obligatorios vacios.',
          
        })

      

      
  }
}

/*
Nombre:modificarEntrada
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Funcion para modificar una entrada, creando dinamicamente el HTML necesario en el modal.
Mediante el valor index, sabemos cual es el id de la entrada a modificar.
*/
function modificarEntrada(index){
  
  
  arrayEntradas.forEach(elemt => {

      if(elemt.id == index){

          var divEAñadir= document.getElementById("editarUsuarioModal");
  
  var dival  = `

    
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">EDITAR TERRENO</h5>
           
        </div>
        <div class="modal-body">
          <form>
          <div class="form-group">
          <input type="hidden" class="form-control" id="modificar-idEntrada" value="${elemt.id}" readonly>
        </div>
        <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Usuario: * </label>
          <input type="text" class="form-control" id="modificar-usuarioEntrada" value="${elemt.usuario}" readonly>
        </div>

        <div class="form-group">
          <label for="recipient-name" class="col-form-label ">Variedad: * </label>
          <input type="text" class="form-control" id="modificar-variedadEntrada" value="${elemt.variedad}" readonly>
        </div>

        <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Parcela: * </label>
        <input type="text" class="form-control" id="modificar-variedadParcela" value="${elemt.parcela}" readonly>
         </div>
         <div class="form-group">
         <label for="recipient-name" class="col-form-label ">Fecha: * </label>
         <input type="date" class="form-control" id="modificar-fechaEntrada" value="${elemt.fecha}">
          </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Kilos: * </label>
        <input type="text" class="form-control" id="modificar-kilosEntrada" value="${elemt.kilos}">
         </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Inutiles: * </label>
        <input type="text" class="form-control" id="modificar-inutilesEntrada" value="${elemt.inutiles}">
         </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Calibre fuera de rango: * </label>
        <input type="text" class="form-control" id="modificar-pequeñasEntrada" value="${elemt.pequeñas}">
         </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Azucar:  </label>
        <input type="text" class="form-control" id="modificar-azucarEntrada" value="${elemt.azucar}">
         </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Presión:  </label>
        <input type="text" class="form-control" id="modificar-presionEntrada" value="${elemt.presion}">
         </div>
         <div class="form-group">
        <label for="recipient-name" class="col-form-label ">Calibre medio: </label>
        <input type="text" class="form-control" id="modificar-calibreMedioEntrada" value="${elemt.calibremedio}">
         </div>
            
          </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="cargarEntradas()" >Cerrar</button>
          <button type="button" class="btn btn-success" onclick="enviarModificarNuevaEntrada()">Editar Entrada</button>

        </div>
      </div>
    </div>

    `
    divEAñadir.innerHTML = dival;
      }

  });

}

/*
Nombre:eliminarAlbaran
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Se muestra una ventana para confirmar si se desea eliminar la entrada que pasamos por paramentros,
y en caso afirmativo, se elimina de la base de datos.
*/
function eliminarEntrada(index ){

  Swal.fire({
      title: '¿Estas seguro de eliminar la entrada?',
      text: 'Una vez eliminado, no podra recuperarse la información',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        
                      $.post('phpEntradas/eliminarEntradas.php',{
                        id : index
                    },
                        function(datos,estado){
                            
                        if(datos == 1){
                           
                          Swal.fire(
                            'ELIMINADO',
                            'La entrada ha sido eliminada correctamente.',
                            'success'
                          )
                          cargarEntradas();
                          }
                        } )

                   
      }
    });
}

/*
Nombre:enviarModificarNuevaEntrada
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que obtiene los datos introducidos en el modal para modificar una entrada,
y guarda los cambios en base de datos.
*/
function enviarModificarNuevaEntrada(){


    
    var kilos = document.getElementById('modificar-kilosEntrada');
    var id = document.getElementById('modificar-idEntrada');
  
    var fecha = document.getElementById('modificar-fechaEntrada');
    var inutiles = document.getElementById('modificar-inutilesEntrada');
  
    var peque = document.getElementById('modificar-pequeñasEntrada');
    var azucar = document.getElementById('modificar-azucarEntrada');
    var presion = document.getElementById('modificar-presionEntrada');
    var calimed = document.getElementById('modificar-calibreMedioEntrada');
  
  
  if(  kilos.value !='' && fecha.value !='' && inutiles.value !='' && peque.value !=''){
  
    console.log("entro en el if ");
                    $.post('phpEntradas/modificarEntrada.php',{
                      id: id.value,
                      kilos : kilos.value,
                      fecha : fecha.value,
                      inutiles : inutiles.value,
                      peque : peque.value,
                      azucar : azucar.value,
                      presion : presion.value,
                      calimed : calimed.value
  
                    },
                        function(datos,estado){
  
                        if(datos == 1){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Entrada actulizada con exito',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                $("#editarUsuarioModal").modal("hide");
                                cargarEntradas();
                            }else{
  
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'ERROR',
                                text: 'No se ha actulizado la entrada.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            }
                        })
    }else{
  
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al guardar la entrada. Exiten campos obligatorios vacios.',
            
          })
  
        
  
        
    }
}

/*
Nombre:valoresEntrada
Valores de entrada: option
Valores de salida: Ninguno
Descripción de la función: Funcion una vez selecionada el valor de la entrada en el select, igualamos los input de el resto de datos
de la parcela a los valores seleccionados en el select.
*/
function valoresEntrada( option) {

   $.post('phpEntradas/obtenerParcelas.php',{
 
   },
     function(datos,estado){
        
         var entradas = [] ;
         entradas = datos;
   
         jsonParcela = JSON.parse(entradas);


         //Igualo los valores
         let parcela = jsonParcela.find(x => x.id == option.value);
         
         var usuarioEntradaInput= document.getElementById("añadir-usuarioEntrada"); 
         usuarioEntradaInput.value = parcela.usuario;
     
         var variedadEntradaInput= document.getElementById("añadir-variedadEntrada"); 
         variedadEntradaInput.value = parcela.variedad;
     
         var variedadParcelaInput= document.getElementById("añadir-variedadParcela"); 
         variedadParcelaInput.value = parcela.parcela;
        
     } )

}

/*
Nombre:getValueVariedad
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select variedades,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion cargarEntradas()
*/
function getValueVariedad (filtro){
  var pro = filtro.options[filtro.selectedIndex].value;
  filterVar = pro;
  cargarEntradas();
}

/*
Nombre:changeFiltroTipoAgri
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select agricultores,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion cargarEntradas()
*/
function changeFiltroTipoAgri(filtro){
  var pro = filtro.options[filtro.selectedIndex].value;
  agriFilter = pro;
  cargarEntradas();
}

/*
Nombre:changeFiltroTipoCampana
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select campañas,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion cargarEntradas()
*/
function changeFiltroTipoCampana(filtro){
  var pro = filtro.options[filtro.selectedIndex].value;
  camFilter = pro;
  cargarEntradas();
}

 /*
Nombre:exportaExcel
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de entradas al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheet para crear el excel con los datos.
*/ 
function exportaExcel(){

  var jsonDataObject = eval(arrayEntradas);		
  console.log(jsonDataObject);
  exportWorksheet(jsonDataObject);
}

 /*
Nombre:exportWorksheet
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheet(jsonObject) {
  var myFile = "misEntradas.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}

 /*
Nombre:generarPDFEntrada
Valores de entrada: index
Valores de salida: Ninguno
Descripción de la función: Funcion que nos genera un PDF con los datos de la entrada indicada en el index.
*/ 
function generarPDFEntrada( index ){
  var entradaPDF;

  arrayEntradas.forEach(elemt => {

    if(elemt.id == index){
      entradaPDF = elemt;
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

  var text = "ENTRADA DE FRUTA";
  doc.text(20,30,text);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,40,"AGRICULTOR:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,40,entradaPDF.usuario);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,50,"VARIEDAD:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,50,entradaPDF.variedad);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,60,"FECHA:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,60,entradaPDF.fecha);

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  doc.text(20,70,"PARCELA:");

  doc.setFontSize(12); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType(""); // tipo front
  doc.text(55,70,entradaPDF.parcela);
  
 

  linea = 70 + 10;
  doc.setFontSize(18); // tamaño
  doc.setTextColor(0,0,0); // color
  doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
  doc.setFontType("bold"); // tipo front
  var txtEntrada = "ESCANDALLO DE LA FRUTA";
  doc.text(20,linea,txtEntrada);
 const textWidth = doc.getTextWidth(text);
 doc.line(20, linea+2,190,linea+2); //LINEA SUBRAYADO   

 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"KILOS TOTALES ENTREGADOS:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(100,linea,entradaPDF.kilos);

 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"KILOS INÚTILES:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(100,linea,entradaPDF.inutiles);

 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"KILOS TAMAÑO PEQUEÑO:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(100,linea,entradaPDF.pequeñas);

 linea = linea + 10;
 doc.setFontSize(14); // tamaño
 doc.setTextColor(0,85,136); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"PORCENTAJE VALIDO TOTAL: "+entradaPDF.porcentajeBueno+" % ");
  
 linea = linea + 10;
 doc.setFontSize(18); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 var txtEntrada = "ESTADO DE LA FRUTA";
 doc.text(20,linea,txtEntrada);
const textWidth2 = doc.getTextWidth(txtEntrada);
doc.line(20, linea+2,190,linea+2); //LINEA SUBRAYADO   


 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"AZÚCAR:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(80,linea,entradaPDF.azucar);

 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"PRESIÓN:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(80,linea,entradaPDF.presion);

 linea = linea + 10;
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType("bold"); // tipo front
 doc.text(20,linea,"CALIBRE MEDIO:");
  
 doc.setFontSize(12); // tamaño
 doc.setTextColor(0,0,0); // color
 doc.setFont("helvetica"); // front 0: ""1: "Bold"2: "Oblique"3: "BoldOblique"
 doc.setFontType(""); // tipo front
 doc.text(80,linea,entradaPDF.calibremedio);

  doc.save('entradPDF.pdf');
}