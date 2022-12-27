arrayDeJugadores = [];
function cargarArrayDeJugadores() {
  classFotos = document.querySelectorAll(".foto");
  for (let i = 1; i <= classFotos.length; i++) {
    jugador = document.getElementById(`foto-${i}`);
    arrayDeJugadores.push(jugador);
  }
}
cargarArrayDeJugadores();

arrayDeCuadros = [];
function cargarArrayDeCuadros() {
  cuadros = document.querySelectorAll(".back");
  cuadros.forEach((cuadro) => {
    arrayDeCuadros.push(cuadro);
  });
}
cargarArrayDeCuadros();

posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

function randomizarImagenes() {
  for (let i = 0; i < arrayDeCuadros.length; i++) {
    if (posiciones.length === 0) {
      break;
    }

    IMAGEN_RANDOM = Math.floor(Math.random() * arrayDeJugadores.length);

    POSICION_RANDOM_1 = Math.floor(Math.random() * posiciones.length);
    POSICION_RANDOM_1 = posiciones[POSICION_RANDOM_1];
    cuadroElegido1 = document.getElementById(`back-${POSICION_RANDOM_1}`);
    cuadroElegido1.src = arrayDeJugadores[IMAGEN_RANDOM].src;
    posicionABorrar1 = posiciones.indexOf(POSICION_RANDOM_1);
    posiciones.splice(posicionABorrar1, 1);

    POSICION_RANDOM_2 = Math.floor(Math.random() * posiciones.length);
    POSICION_RANDOM_2 = posiciones[POSICION_RANDOM_2];
    cuadroElegido2 = document.getElementById(`back-${POSICION_RANDOM_2}`);
    cuadroElegido2.src = arrayDeJugadores[IMAGEN_RANDOM].src;
    posicionABorrar2 = posiciones.indexOf(POSICION_RANDOM_2);
    posiciones.splice(posicionABorrar2, 1);

    imagenABorrar = arrayDeJugadores[IMAGEN_RANDOM];
    imagenABorrar = arrayDeJugadores.indexOf(imagenABorrar);
    arrayDeJugadores.splice(imagenABorrar, 1);
  }
}

randomizarImagenes();

tarjetas = document.querySelectorAll(".cuadro");
tarjetas.forEach(function ($tarjeta) {
  $tarjeta.onclick = recibirPrimerClick;
});

contadorDeAciertos = 0;

function recibirPrimerClick(e) {
  $tarjeta = e.target;
  $tarjeta = $tarjeta.id;
  numeroID = $tarjeta.match(/\d/g);
  if (numeroID.length > 1) {
    numeroID = numeroID.join("");
  }
  numeroID = numeroID.toString();
  console.log(numeroID);
  back = document.getElementById(`back-${numeroID}`);
  back.style.backfaceVisibility = "visible";
  back.style.transform = "rotateY(0deg)";
}

