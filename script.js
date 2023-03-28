
//// Funcionalidad de abrir y cerrar el menu

const menu = document.getElementById('menujs');

const botonMenu = document.getElementById('icono-menu');
botonMenu.addEventListener('click', clickMenu);

function clickMenu() {
    menu.classList.toggle('menuescondido');

    iconoBoton = document.getElementById('icono-menu').icon;

    if (iconoBoton == 'mingcute:menu-fill') {
        botonMenu.icon = 'mdi:close-thick';
    }

    if (iconoBoton == 'mdi:close-thick') {
        botonMenu.icon = 'mingcute:menu-fill';
    }
}


/// Funcionalidad de rotar los textos

const frases = ['3 cuotas sin interés', 'Envíos a todo el país', 'Garantía de por vida'];
const displayFrases = document.getElementById('displayFrases');



function cambiarDisplay(lista) {

    displayFrases.textContent = lista[0];

    var index = 1;

    setInterval(() => {
        displayFrases.textContent = lista[index];

        // para repetir la operacion calculamos el resto de una division, cuando da 1 significa que llegamos al fin y volvemos a empezar el array

        var divisor = index / lista.length;

        if (divisor == 1) {
            index = 0;
            displayFrases.textContent = lista[index];
        } else {
            index = index + 1;
        }

    }, 3000);
}


if (frases && displayFrases) {
    cambiarDisplay(frases);
}



/// FUNCIONALIDAD DEL SLIDER

// obtiene el elemento slider
var slider = document.getElementById('slider');

// define el array (listado de fotos) a usar
var slides = [
    "img/slide01.jpg",
    "img/slide02.jpg",
    "img/slide03.jpg",
];


////   
// marca el numero de indice 1 del array a usar. Pongo 1, porque JavaScript empieza a contar desde 0, entonces si mi script corre a los 3 segundos, la primera vez que corra quiero que me ponga la segunda imagen, porque la primera ya esta ahi
var i = 1;

// Declaro la funcion
function cambiarSlide() {
    //Toma el objeto slider y cambia su SRC (dire de la foto) por una del array con indice i
    slider.src = slides[i];
    // Suma uno al indice i para que avance el recorrido del array
    i++;

    // si la i es igual a la Lenght (largo) del array, es decir 3 (0, 1, 2), entonces volver la i a 0 asi vuelve a empezar
    if (i >= slides.length) {
        i = 0;
    }
}

/// ahora le digo que cada 3 segundos me ejecute la funcion

if (slides && slider) {
    setInterval(cambiarSlide, 3000);
}
