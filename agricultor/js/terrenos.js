
var arrayTerrenos = []; // variable general donde almacenamos los terrenos
var varFilter="";// variable general donde almacenamos el valor del filtro variedad aplicado
var usuario ="";// variable general donde almacenamos el usuario logeado

/*
Nombre:obtenerDatosTerrenos
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los terrenos de la base de datos,
los alamacena en la variable general y llama a la función obtenervariedadesUsuario para obtener mas datos.
*/
function obtenerDatosTerrenos(user){

$.post('phpTerrenos/obtenerTerrenosUsuario.php',{

    usuario : user
},
  function(datos,estado){
     
      var terrenos = [] ;
      terrenos = datos;

      jsonTerrenos = JSON.parse(terrenos);
      arrayTerrenos = jsonTerrenos;
      usuario = user;
      obtenervariedadesUsuario(user);
      
  } );
}

/*
Nombre:obtenervariedadesUsuario
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las variedades de la base de datos
 y llama a la función crearHTMLTerrenos para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenervariedadesUsuario(user){

    $.post('phpTerrenos/obtenerVariedadesUsuario.php',{
    
        usuario : user
     
    },
      function(datos,estado){
         
          var variedades = [] ;
          variedades = datos;
    
          jsonVariedades = JSON.parse(variedades);
          crearHTMLTerrenos(jsonVariedades,user);
          
      } );

}

/*
Nombre:crearHTMLTerrenos
Valores de entrada: jsonVariedades,user
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los terrenos,
obtenidos anteriormente y almacenados en la variable general arrayTerrenos.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function crearHTMLTerrenos(jsonVariedades,user){

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
    <button class="btn btn-success " onclick="exportarExcelTerreno()">EXCEL</button>
    </div>
    <div class="col-4"> 
        <select class="browser-default custom-select" id="tipoVariedadFiltro" onchange="changeFiltroTipoVar(this);">`

        if(varFilter == ""){
          dival +=   ` <option selected="true"  value="" >Todos las variedades</option>`
      }else{
          dival +=   ` <option value="" >Todos las variedades</option>`
      }

      jsonVariedades.forEach(elementvar => {
          if(varFilter == elementvar.variedad){
            dival += `<option selected="true" value="${elementvar.variedad}">${elementvar.variedad} </option>`
            arrayTerrenos= arrayTerrenos.filter(e => e.variedad == elementvar.variedad );

        }else{
            
            dival += `<option value="${elementvar.variedad}">${elementvar.variedad} </option>`
        }

        });

        dival +=   `</select> </div>
        
    </div>
        <style>
        .titulo{

        font-weight: bold;
        color: #EC4811;
        font-size:20px;

    }
     </style >
        <div class="row" >
        <div class=" titulo col-5" >
                <p>PARCCELA</p>
            </div>
            <div class=" titulo col-3" >
                <p>USUARIO</p>
            </div>
            <div class="titulo col-2" >
            <p>VARIEDAD</p>
             </div>
            <div class="titulo col-2" >
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
                                                                    <div class=" datos col-5 align-self-center">
                                                                    <p>${element.parcela}</p>
                                                                    </div>
                                                                    <div class=" datos col-3 align-self-center">
                                                                    <p>${element.usuario}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.variedad}</p>
                                                                    </div>
                                                                    <div class="datos col-2 align-self-center">
                                                                    <p>${element.tamaño}</p>
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
Nombre:changeFiltroTipoVar
Valores de entrada: filtroVariedad -> elemento select que ha cambiado.
Valores de salida: Ninguno
Descripción de la función: Función que se activa cuando selecionamos un nuevo valor en el select variedad,
para filtrar nuestro array de entradas por dicho valor , y volver a cargar los datos, llamando a la funcion obtenerDatosTerrenos()
*/
function changeFiltroTipoVar(filtroVariedad){
  
    var pro = filtroVariedad.options[filtroVariedad.selectedIndex].value;
    varFilter = pro;
    obtenerDatosTerrenos(usuario);
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