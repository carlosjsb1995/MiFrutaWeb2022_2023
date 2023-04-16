var arrayTratamientos = []; // variable general donde almacenamos los tratamientos
var terrenoFilter=""; // variable general donde almacenamos el valor del terreno variedad aplicado

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

$.post('phpTratamientos/obtenerTerrenos.php',{
 
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

let divAlmacen = document.getElementById('contenedorPrincipal');
var dival =`
<style>
.marginz{
    
    margin-bottom: 10px;
}
</style>
<div class ="row marginz">
    <div class="col-8">
    <button class="btn btn-success " onclick="exportaExcelTratamientos()">EXCEL</button>
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
Una vez tranformado, llama a la funcion exportWorksheetTratamientos para crear el excel con los datos.
*/ 
function exportaExcelTratamientos(){

  var jsonDataObject = eval(arrayTratamientos);		
  exportWorksheetTratamientos(jsonDataObject);
}

 /*
Nombre:exportWorksheetTratamientos
Valores de entrada: jsonObject
Valores de salida: Ninguno
Descripción de la función: Funcion que nos crea un excel con los datos que le pasamos en jsonObject.
*/ 
function exportWorksheetTratamientos(jsonObject) {
  var myFile = "Tratamientos.xlsx";
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "hoja1");
  XLSX.writeFile(myWorkBook, myFile);
}