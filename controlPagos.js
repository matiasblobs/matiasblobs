
var revisarStorage = localStorage.getItem("sociosGuardados");

if (revisarStorage === null) {
    var socios = [];
} else {
    var socios = JSON.parse(localStorage.getItem("sociosGuardados"));
}


function actualizarCantCuotas() {
  let hoy = new Date();
  let mesActual = hoy.getMonth();

  socios.forEach((socio, n) => { 
    // Vemos las cuotas que tiene cargadas funciona solo 2023
    var cuotasRegistradas = Object.values(socio.cuotas);
    var cantCuotas = cuotasRegistradas.length - 1;
  
    if (cantCuotas !== mesActual ) {
      for (i = mesActual; i > cantCuotas; i--){
        socio.cuotas[i] = 'adeudado';
      }
    }
  }) 
}

// Armar funcion que revisa si tenes un Adeudado y te rechaza

// Armar funcion que pone PAGADO