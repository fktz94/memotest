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

contadorDeAciertos = 0;
arrayComparativo = [];

tarjetas = document.querySelectorAll(".cuadro");
tarjetas.forEach(function ($tarjeta) {
  $tarjeta.onclick = recibirClicks;
});

IDs = [];
cuadrosBloqueados = [];

function bloquearCuadros(cuadros) {
  if (cuadros.length > 0) {
    cuadros.forEach(function (cuadro) {
      cuadro.onclick = function () {};
    });
  }
}

function recibirClicks(e) {
  $tarjeta = e.target;
  $tarjeta = $tarjeta.id;
  numeroID = $tarjeta.match(/\d/g);
  if (numeroID.length > 1) {
    numeroID = numeroID.join("");
  }
  numeroID = numeroID.toString();
  IDs.push(numeroID);
  if (IDs.length === 1) {
    back1 = document.getElementById(`back-${IDs[0]}`);
    back1.style.backfaceVisibility = "visible";
    back1.style.transform = "rotateY(0deg)";
    back1.style.cursor = "auto";
    arrayComparativo.push(back1);
    cuadro1 = document.getElementById(`pos-${IDs[0]}`);
    cuadro1.onclick = function () {};
  } else if (IDs.length > 1) {
    back2 = document.getElementById(`back-${IDs[1]}`);
    back2.style.backfaceVisibility = "visible";
    back2.style.transform = "rotateY(0deg)";
    back2.style.cursor = "auto";
    arrayComparativo.push(back2);
    cuadro2 = document.getElementById(`pos-${IDs[1]}`);
    cuadro2.onclick = function () {};

    if (IDs.length === 2) {
      tarjetas = document.querySelectorAll(".cuadro");
      tarjetas.forEach(function ($tarjeta) {
        $tarjeta.onclick = function () {};
        $tarjeta.style.pointerEvents = "none";
      });
    }
    comparar(back1, cuadro1, back2, cuadro2);
  }
}

function comparar(back1, cuadro1, back2, cuadro2) {
  if (arrayComparativo[0].src === arrayComparativo[1].src) {
    back1.classList.add("encontrado");
    back2.classList.add("encontrado");
    cuadrosBloqueados.push(cuadro1);
    cuadrosBloqueados.push(cuadro2);

    IDs = [];
    arrayComparativo = [];

    contadorDeAciertos++;

    tarjetas = document.querySelectorAll(".cuadro");
    tarjetas.forEach(function ($tarjeta) {
      $tarjeta.onclick = recibirClicks;
      $tarjeta.style.pointerEvents = "all";
    });

    bloquearCuadros(cuadrosBloqueados);
    if (contadorDeAciertos === 9) {
      ganar();
    }
  } else if (arrayComparativo[0].src !== arrayComparativo[1].src) {
    setTimeout(volverCartasAlReverso, 500);
  }
}

function volverCartasAlReverso() {
  back1.style.cssText = "";
  back2.style.cssText = "";

  cuadro1.onclick = recibirClicks;
  cuadro2.onclick = recibirClicks;

  tarjetas = document.querySelectorAll(".cuadro");
  tarjetas.forEach(function ($tarjeta) {
    $tarjeta.onclick = recibirClicks;
    $tarjeta.style.pointerEvents = "all";
  });

  IDs = [];
  arrayComparativo = [];
}

function ganar() {
  $divGanaste = document.getElementById("ganaste");
  $divGanaste.classList.remove("d-none");
}

$botonVolverAJugar = document.getElementById("ganaste-btn");
$botonVolverAJugar.onclick = volverAJugar;

function volverAJugar() {
  todosLosBack = document.querySelectorAll(".back");
  todosLosBack.forEach(function (back) {
    back.classList.remove("encontrado");
    back.style.cssText = "";
  });

  arrayDeJugadores = [];
  cargarArrayDeJugadores();

  arrayDeCuadros = [];
  cargarArrayDeCuadros();

  posiciones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  randomizarImagenes();
  contadorDeAciertos = 0;
  arrayComparativo = [];
  IDs = [];
  cuadrosBloqueados = [];

  tarjetas = document.querySelectorAll(".cuadro");
  tarjetas.forEach(function ($tarjeta) {
    $tarjeta.onclick = recibirClicks;
  });
  $divGanaste = document.getElementById("ganaste");
  $divGanaste.classList.add("d-none");
}
