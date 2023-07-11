var socioEntrando = JSON.parse(localStorage.getItem("socioEntrando"));

var textoCategoria = 'Socio';


switch (socioEntrando.categoria) {
    case "pleno":
      textoCategoria = 'Socio Pleno:';
      break;
    case "cadete":
      textoCategoria = 'Cadete';
      break;
    case "adherente":
        textoCategoria = 'Adherente';
      break;
    default:
        textoCategoria = 'Socio';
  }




const espacioInfo = document.getElementById('infoSocio');

espacioInfo.innerText = 'Bienvenido ' + textoCategoria + ' ' + socioEntrando.nombre + ' ' + socioEntrando.apellido;

