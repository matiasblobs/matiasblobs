actualizarCantCuotas();


const botonBuscarSocio = document.getElementById('botonBuscar');
const cantidadSocios = document.getElementById('cantidadSocios');
const cajaResultado = document.getElementById('cajaResultado');
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

var socioElegido = '';

botonBuscarSocio.addEventListener('click', buscarSocio);


function cargarCantidadSociosRegistrados() {
    cantidadSocios.innerHTML = socios.length;
}
cargarCantidadSociosRegistrados();



function buscarSocio() {
    var campoDni = document.getElementById('dni');

    if (socios.length === 0) {
        alert('error, el array socios se encuentra vacio');
    } else {
        var socioEncontrado = socios.find((socio) => {
            if (socio.dni === campoDni.value) {
                return 1
            };
        });

        if (socioEncontrado === undefined){
            alert('No se encontro un socio con el N de DNI ' + campoDni.value);
        } else {
            escribirSocioEncontrado(socioEncontrado);  
            socioElegido = socioEncontrado;         
        }       
    }
};

function escribirSocioEncontrado(socioEncontrado){ 

    var detalleArancelario = '';   
    var arregloCuotas = Object.values(socioEncontrado.cuotas);

    arregloCuotas.forEach((cuota, i) => {

        switch (cuota) {
            case "inactivo":
                detalleArancelario += `<p class="pequeno">${nombresMeses[i]}: INACTIVO</p><hr>`;
              break;
            case "pagado":
                detalleArancelario += `<p>${nombresMeses[i]}: PAGADO</p><hr>`;
              break;
            case "adeudado":
                detalleArancelario += `<p>${nombresMeses[i]}: ADEUDADO <button onclick="pagar('${i}')" class="botonPagar">PAGAR</button></p><hr>`;
              break;
            
          }

        
    });


    cajaResultado.innerHTML = `
    <p><b>Apellido:</b> ${socioEncontrado.apellido}</br>
    <b>Nombre:</b> ${socioEncontrado.nombre}</br>
    <b>Email:</b> ${socioEncontrado.email}</br>
    <b>Teléfono:</b> ${socioEncontrado.telefono}</br>
    <b>DNI:</b> ${socioEncontrado.dni}</br>
    <b>Categoria:</b> ${socioEncontrado.categoria}</br>
    <b>Mes de Inscripción:</b> ${nombresMeses[socioEncontrado.mesinscripcion]} de 2023</p>
    
    <p><b>SITUACIÓN ARANCELARIA 2023</b></p>` + detalleArancelario;
    
};

function pagar(i) {

    indice = socios.findIndex(function(socio) {
        return socio.dni === socioElegido.dni;
    });

    socios[indice].cuotas[i] = 'pagado';
    escribirSocioEncontrado(socios[indice]);
    localStorage.setItem("sociosGuardados", JSON.stringify(socios));

}

