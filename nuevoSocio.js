
// iniciamos la variable Socios segun haya o no haya cosas en Local Storage

var revisarStorage = localStorage.getItem("sociosGuardados");
if (revisarStorage === null) {
    var socios = [];
} else {
    var socios = JSON.parse(localStorage.getItem("sociosGuardados"));
}

const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Hacemos un par de funciones para trabajar mas rapido, una que borre todo en socios y otra que cargue 3 socios de ejemplo

var botonBorrarSocios = document.getElementById('limpiarSocios');
var botonCargarSociosEjemplo = document.getElementById('cargarEjemplo');

botonBorrarSocios.addEventListener('click', limpiarSocios);
botonCargarSociosEjemplo.addEventListener('click', cargarEjemplos);

function limpiarSocios() {
    socios = [];
    localStorage.setItem("sociosGuardados", JSON.stringify(socios));
    console.log(socios);
}

function cargarEjemplos() {
    limpiarSocios();

    var socioEj1 = {
        "nombre": "Matias",
        "apellido": "Molina",
        "email": "matias@email.com",
        "telefono": "3355 555 555",
        "dni": "32235276",
        "categoria": "cadete",
        "anioinscripcion": "2023",
        "mesinscripcion": "4",
        "cuotas": {
            "0": "inactivo",
            "1": "inactivo",
            "2": "inactivo",
            "3": "inactivo",
            "4": "adeudado"
        }
    };

    var socioEj2 = {
        "nombre": "Alberto",
        "apellido": "Medina",
        "email": "chaqueno@email.com",
        "telefono": "4455 555 555",
        "dni": "32502572",
        "categoria": "pleno",
        "anioinscripcion": "2023",
        "mesinscripcion": "2",
        "cuotas": {
            "0": "inactivo",
            "1": "inactivo",
            "2": "adeudado"
        }
    };

    var socioEj3 = {
        "nombre": "Lorena",
        "apellido": "Escobar",
        "email": "lore@email.com",
        "telefono": "6655 555 555",
        "dni": "31709834",
        "categoria": "adherente",
        "anioinscripcion": "2023",
        "mesinscripcion": "4",
        "cuotas": {
            "0": "inactivo",
            "1": "inactivo",
            "2": "inactivo",
            "3": "inactivo",
            "4": "adeudado",
        }
    };

    socios.push(socioEj1);
    socios.push(socioEj2);
    socios.push(socioEj3);
    localStorage.setItem("sociosGuardados", JSON.stringify(socios));    

    console.log(socios);
}

// fin de funciones para programar rapido







var socio = {};
var campoRespuesta = document.getElementById('respuesta');



function inicial() {   
    var botonEnviar = document.getElementById('botonEnviar');
    botonEnviar.addEventListener('click', cargarSocio);
}

function opcionesMesInscripcion () {
    var selectorInscripcion = document.getElementById('fechaInscripcion');
    // Cargamos en el selector los meses desde enero 2023 hasta el actual

    // primero vemos en que mes estamos
    let hoy = new Date();
    let anio = hoy.getFullYear();
    let mes = hoy.getMonth();

    i=0
    for(i=0; i <= mes; i++) {
        var nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = i;
        nuevaOpcion.text = nombresMeses[i] + ' 2023';   
        if (i === mes) {
            nuevaOpcion.selected = true;
        }     
        selectorInscripcion.add(nuevaOpcion);
    }
}

opcionesMesInscripcion();

function cargarSocio() {
    var campoNombre = document.getElementById('nombre');
    var campoApellido = document.getElementById('apellido');
    var campoEmail = document.getElementById('email');
    var campoTelefono = document.getElementById('telefono');
    var campoCategoria = document.getElementById('categoria');
    var campoDni = document.getElementById('dni');
    var campoFecha = document.getElementById('fechaInscripcion');    
    

    if (campoNombre.value != '' && 
        campoApellido.value != '' &&
        campoEmail.value != '' &&
        campoDni.value != '')
    { 
        // Revisar que no haya otro socio con el mismo DNI
        var repetido = socios.find ((socio) => {
            if (socio.dni === campoDni.value) {
                return 1;
            };
        });        

        if (repetido == undefined) {

            socio.nombre = campoNombre.value;
            socio.apellido = campoApellido.value;
            socio.email = campoEmail.value;
            socio.telefono = campoTelefono.value;
            socio.categoria = campoCategoria.value;
            socio.dni = campoDni.value;
            socio.anioinscripcion = 2023;
            socio.mesinscripcion = campoFecha.value;
            socio.cuotas = {};

            //Cargamos las cuotas anteriores a la fecha de ingreso como inactivas

            
            for (m = campoFecha.value; m >= 0; m--) {
                if (m === campoFecha.value){
                    socio.cuotas[m] = 'adeudado';
                } else {
                    socio.cuotas[m] = 'inactivo';
                };
                
            }

            // pusheamos el socio

            socios.push(socio);
            console.log(socio);
            console.log(socios);

            escribirRespuesta();
            localStorage.setItem("sociosGuardados", JSON.stringify(socios));

        } else {
            alert('El número de DNI ingresado ya corresponde con un socio registrado');
            
        }

        
    } else
    { alert('debes rellenar los campos marcados con *')};

    

    
}

function escribirRespuesta() {
    
    let arregloMes = nombresMeses[socio.mesinscripcion];
    

    campoRespuesta.innerHTML = `<h4>Cargaste exitosamente un nuevo socio</h4>
    <p>
    <b>Nombre:</b> ${socio.nombre}</br>
    <b>Apellido:</b> ${socio.apellido}</br>
    <b>E-mail:</b> ${socio.email}</br>
    <b>Teléfono:</b> ${socio.telefono}</br>
    <b>Categoria:</b> ${socio.categoria}</br>
    <b>DNI:</b> ${socio.dni}</br>
    <b>Mes de Inscripción:</b> ${arregloMes} / ${socio.anioinscripcion}</br>
    </p>
    <p><b>Tienes un total de:</b> ${socios.length} socios.</p>
    <a href="./cargarSocio.html"><button class="botonPrimario">Cargar otro socio</button></a>`;
}

inicial();