
var jsonAlbaranes = [];// variable general donde almacenamos los albaranes
var jsonAlbaranesLineas = [];// variable general donde almacenamos las lineas de los albaranes
var usuarioGlobal = ""; // variable general donde almacenamos el usuario logeado
var jsonMaterialesGlobal; // variable general donde almacenamos los materiales actuales del almacen del usuario

/*
Nombre:obtenerAlmacen
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los albaranes de la base de datos,
los alamacena en la variable general y llama a la función obtenerDatosAlbaranesLineas para obtener mas datos.
*/
function obtenerAlmacen(user){

$.post('phpAlmacen/albaranesUsuario.php',{
    usuario : user
},
  function(datos,estado){
     
      var albaranes = [] ;
      albaranes = datos;

      jsonAlbaranes = JSON.parse(albaranes);
      usuarioGlobal = user;
      obtenerDatosAlbaranesLineas(usuarioGlobal);
    
  } )

}

/*
Nombre:obtenerDatosAlbaranesLineas
Valores de entrada: user
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de las lineas de los albaranes de la base de datos,
l y llama a la función cargarHtmlAlmacen para crear dinamicamente la representacion HTML de los datos obtenidos.
*/
function obtenerDatosAlbaranesLineas(user){

  $.post('phpAlmacen/albaranesLineasUsuario.php',{
    usuario : user
  },
    function(datos,estado){
       
        var albaranesLineas = [] ;
        albaranesLineas = datos;
  
        jsonAlbaranesLineas = JSON.parse(albaranesLineas);
        cargarHtmlAlmacen();
      
    } )
}

/*
Nombre:cargarHtmlAlmacen
Valores de entrada: Ninguno
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de los albaranes,
obtenidos anteriormente y almacenados en la variable general jsonAlbaranes y sus lineas alamacenados en jsonAlbaranesLineas.
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
function cargarHtmlAlmacen(){

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
            <button class="btn btn-info " onclick="miAlmacen()">MI ALMACEN</button>
            <button class="btn btn-success " onclick="exportaExcelAlbaranes()">EXCEL</button>
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
         console.log(lineasFiltradas);
    
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
                                                                        </div>
    
                                                                        
                                                                    </div>     
                                                        </div>
                                                        <div id="collapse${i}" class="collapse" arial-labelledby="heading${i}" data-parent="#accordion">
                                                            <div class="row card-body">`
                                                            lineasFiltradas.forEach(element2 => {
    
                                                                dival +=` <div class="row-12">
                                                                <p><strong>LÍNEA:</strong> ${element2.linea},<strong>Material:</strong> ${element2.nombre},<strong>Cantidad:</strong>${element2.cantidad},<strong>Comentario:</strong>${element2.comentario}  
                                                               
                                                                 </p>
                                                                
                                                        </div>`
                                                            });
    
                                                                
                                                                    
                                                            dival += ` </div>
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
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Albaranes");
    //XLSX.writeFile(myWorkBook, myFile);

    //Añado tambien los lineas en hoja2.
    var jsonDataObjectLin = eval(jsonAlbaranesLineas);		
    var myWorkSheetLin = XLSX.utils.json_to_sheet(jsonDataObjectLin);
    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheetLin, "Lineas_Albaranes");
    XLSX.writeFile(myWorkBook, myFile);
}

/*
Nombre:miAlmacen
Valores de entrada: Niguno
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los materiales de la base de datos,
los alamacena en la variable general y llama a la función ObtenerTiposMateriales para obtener mas datos necesarios.
*/
function miAlmacen(){

    $.post('phpAlmacen/obtenerMiAlmacen.php',{

        usuario: usuarioGlobal
    },
      function(datos,estado){
         
          var mialmcn = [] ;
          mialmcn = datos;

          var jsonAlbaranesUser = JSON.parse(mialmcn);
          ObtenerTiposMateriales(jsonAlbaranesUser);
           
      } )
  
  }

/*
Nombre:ObtenerTiposMateriales
Valores de entrada: jsonAlbaranesUser
Valores de salida: Ninguno
Descripción de la función: Función que obtiene los datos de los materiales de la base de datos,
 y llama a la función crearHMTLMiAlmacen para crear el HTML con dichos datos dinamicamente.
*/
  function ObtenerTiposMateriales(jsonAlbaranesUser){

    $.post('phpAlmacen/obtenerMateriales.php',{
        usuario: usuarioGlobal
    },
      function(datos,estado){
         
          var materiales = [] ;
          materiales = datos;
         
          var jsonMat = JSON.parse(materiales);
           crearHMTLMiAlmacen(jsonAlbaranesUser,jsonMat);
           
      } )
  
  }

  /*
Nombre:crearHMTLMiAlmacen
Valores de entrada: jsonAlbaranesUser,jsonMat
Valores de salida: Ninguno
Descripción de la función: Crea el HTML dinamicamente para la representacion de los datos de lo materiales,
obtenidos anteriormente, mediante los albaranes del usuario (jsonAlbaranesUser) y los materiales existenes (jsonMat).
Una vez creado el HTML, lo asignamos a nuestro contendor principal para mostrarlo al usuario.
*/
  function crearHMTLMiAlmacen(jsonAlbaranesUser,jsonMat){

//T
//FOR( POR CADA ELEMENTO)--> CALCULAR CUENTOS TIENE EL AGRICULTOR EN SU PODER 
// EMPIEZO POR CERO, SI ES SALIDA AGRICULTOR LO SUMO, SI ES ENTRADA LO RESTO.F]s7u_q!4^A0qqWm
var jsonMaterialesUsuario=[];

jsonMat.forEach(material =>{

    var id = material.id;
    var nombre = material.nombre;
    var descripcion = material.descripcion;
    var cantidad = 0;

    jsonAlbaranesUser.forEach(albaranl =>{

        if(albaranl.idMaterial == id){

            if(albaranl.tipo == "SALIDA USUARIO"){
                
                cantidad = Number(cantidad) + Number(albaranl.cantidad);
            }

            if(albaranl.tipo == "ENTRADA USUARIO"){
                
                cantidad = Number(cantidad) - Number(albaranl.cantidad);
            }
        }
    })
    jsonMaterialesUsuario.push({
        "id": id,
        "nombre": nombre,
        "descripcion": descripcion,
        "cantidadTotal" : cantidad
    });

})

 // Creo la estructura html.
let divAlmacen = document.getElementById('contenedorPrincipal');
var dival =`
<style>
.marginz{
    
    margin-bottom: 10px;
}
</style>
<div class ="row marginz">
    <div class="col-6"> <button class="btn btn-info "  onclick="obtenerAlmacen('${usuarioGlobal}')">MIS ALBARANES</button>
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
        <div class="titulo col-5" >
        <p>DESCRIPCIÓN</p>
         </div>
        <div class="titulo col-3" >
            <p>CANTIDAD TOTAL</p>
        </div>
      
        </div>
        
    </div>
`

console.log(jsonMaterialesUsuario);
jsonMaterialesGlobal = jsonMaterialesUsuario;
var i=0;
jsonMaterialesUsuario.forEach(element => {



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
                                                                <div class="datos col-5 align-self-center">
                                                                <p>${element.descripcion}</p>
                                                                </div>
                                                                <div class="datos col-3 align-self-center">
                                                                <p>${element.cantidadTotal}</p>
                                                                </div>

                                                            </div>     
                                                </div>
                                                `
                                                    

                                                        
                                                            
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