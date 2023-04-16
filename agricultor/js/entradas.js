
var arrayEntradas; // variable general donde almacenamos las entradas
var filterVar="";// variable general donde almacenamos el valor del filtro variedad aplicado
var camFilter=""; // variable general donde almacenamos el valor del filtro campaña aplicado
var usuarioGlobal=""; // variable general donde almacenamos el usuario logeado

/*
Nombre:cargarEntradas
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las entradas de la base de datos,
los alamacena en la variable general y llama a la función obtenerVariedades para obtener mas datos.
*/
function cargarEntradas(user){

    //Obtenemos los datos de las entradas.
    $.post('phpEntradas/obtenerEntradasUsuario.php',{
        usuario : user
    },
      function(datos,estado){
         
          var entradas = [] ;
          entradas = datos;
          jsonEntradas = JSON.parse(entradas);
          arrayEntradas = jsonEntradas;
          usuarioGlobal = user;
          obtenerVariedades(user);
        
      });
 }

 /*
Nombre:obtenerVariedades
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función obtenerCampana para obtener mas datos necesarios para la repesentacion de las entradas.
*/
 function obtenerVariedades(user){

   $.post('phpEntradas/obtenerVariedadesUsuario.php',{
    usuario : user
   },
     function(datos,estado){
        
         var variedades = [] ;
         variedades = datos;

         jsonVariedades = JSON.parse(variedades);
         obtenerCampana(user,jsonVariedades);
       
     });
 }

 /*
Nombre:obtenerCampana
Valores de entrada: user,jsonVariedades
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las campañas de la base de datos
 y llama a la función crearHTMLEntradas para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
 function obtenerCampana(user,jsonVariedades){

  $.post('phpEntradas/obtenerCampana.php',{

  },
    function(datos,estado){
       
        var campana = [] ;
        campana = datos;

        jsonCampana = JSON.parse(campana);
        crearHTMLEntradas(user,jsonVariedades,jsonCampana);
      
    });
 }

 /*
Nombre:crearHTMLEntradas
Valores de entrada: user,jsonVariedades,jsonCampana
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de las entradas,
obtenidos anteriormente y almacenados en la variable general arrayEntradas.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
 function crearHTMLEntradas(user,jsonVariedades,jsonCampana){

    let divAlmacen = document.getElementById('contenedorPrincipal');
    var dival =`
    <style>
	.marginz{
		
		margin-bottom: 10px;
	}
</style>
    <div class ="row marginz">
    <div class="col-6">
        <button class="btn btn-success " onclick="exportaExcelEntradas()"> EXCEL </button>
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
                                                                  
                                                                    </div>

                                                                    
                                                                </div>     
                                                    </div>
                                                    <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                        <div class="row card-body">
                                                            <div class="col">
                                                                <p><strong>Parcela:</strong> ${element.parcela}</p>
                                                                <p><strong>Inutiles:</strong> ${element.inutiles} Kg</p>
                                                                <p><strong>Calibre fuera de rango:</strong> ${element.pequeñas} Kg</p>
                                                                <p><strong>Azucar:</strong> ${element.azucar}</p>
                                                                <p><strong>Presión:</strong> ${element.presion}</p>
                                                                <p><strong>Calibre medio:</strong> ${element.calibremedio} cm</p>
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
Nombre:getValueVariedad
Valores de entrada: filtro -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select variedades,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion cargarEntradas()
*/
 function getValueVariedad (filtro){

    var pro = filtro.options[filtro.selectedIndex].value;
    filterVar = pro;
    cargarEntradas(usuarioGlobal);
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
    cargarEntradas(usuarioGlobal);
}

 /*
Nombre:exportaExcelEntradas
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Funcion que tranforma nuestro array de entradas al formato correcto para poder exportar a excel.
Una vez tranformado, llama a la funcion exportWorksheetEntradas para crear el excel con los datos.
*/ 
function exportaExcelEntradas(){

    var jsonDataObject = eval(arrayEntradas);		
    exportWorksheetEntradas(jsonDataObject);
}

 /*
Nombre:exportWorksheetEntradas
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetEntradas(jsonObject) {

    var myFile = "misEntradas.xlsx";
    var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
    var myWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
    XLSX.writeFile(myWorkBook, myFile);
}