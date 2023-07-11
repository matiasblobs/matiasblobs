actualizarCantCuotas();


function home(){
var linkAdmin = document.getElementById('accesoAdmin');
linkAdmin.addEventListener('click', paginaAdmin);
};
home();

// Buscar socio Dar o Denegar Acceso

var campoDNIHome = document.getElementById('campoDNIHome');
var botonIngreso = document.getElementById('botonIngreso');

botonIngreso.addEventListener('click', revisarIngreso);

function revisarIngreso() {
    if (campoDNIHome.value === '') {
        alert('Debe ingresar un número de DNI valido');
    } else {
        var socioEncontrado = socios.find((socio) => {
            if (socio.dni === campoDNIHome.value) {
                return 1
            };
        });      
    };

    if(socioEncontrado === undefined) {
        alert('el numero de DNI ingresado no corresponde a un socio registrado, por favor intente nuevamente');
    } else {
        var cuotas = socioEncontrado.cuotas;
     
        var mesAdeudado = Object.keys(cuotas).find(key => cuotas[key] === "adeudado");

        if (mesAdeudado === undefined) {
            localStorage.setItem("socioEntrando", JSON.stringify(socioEncontrado));
            location.href = './socioAceptado.html';

        } else {
            location.href = './socioRechazado.html';

        };      

    }

};





// Ingreso con clave a Pagina Admin

function paginaAdmin() {
    var contrasena = '1234';
    var login = prompt('Ingrese su contraseña (1234)');

    if(contrasena === login) {
        location.href = 'administracion.html';
    } else {
        alert(' :(  contraseña incorrecta ')
    };
}

