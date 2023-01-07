function obtenerCartas() {
  const arrayDeJugadores = [];
  let $classFotos = document.querySelectorAll(".foto");
  for (let i = 1; i <= $classFotos.length; i++) {
    let $jugador = document.getElementById(`foto-${i}`);
    arrayDeJugadores.push($jugador);
  }
  return arrayDeJugadores;
}
obtenerCartas();
const arrayDeJugadores = obtenerCartas();

function obtenerReversoDeTarjetas() {
  const arrayDeCuadros = [];
  let $cuadros = document.querySelectorAll(".back");
  $cuadros.forEach((cuadro) => {
    arrayDeCuadros.push(cuadro);
  });
  return arrayDeCuadros;
}

obtenerReversoDeTarjetas();
const arrayDeCuadros = obtenerReversoDeTarjetas();

console.log(arrayDeJugadores);
console.log(arrayDeCuadros);

function randomizarImagenes() {
  const posiciones = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  for (let i = 0; i < arrayDeCuadros.length; i++) {
    if (posiciones.length === 0) {
      break;
    }

    let jugadorAleatorio = Math.floor(Math.random() * arrayDeJugadores.length);

    let posicionRandom1 = Math.floor(Math.random() * posiciones.length);
    posicionRandom1 = posiciones[posicionRandom1];
    let cuadroElegido1 = document.getElementById(`back-${posicionRandom1}`);
    cuadroElegido1.src = arrayDeJugadores[jugadorAleatorio].src;
    let posicionABorrar1 = posiciones.indexOf(posicionRandom1);
    posiciones.splice(posicionABorrar1, 1);

    let posicionRandom2 = Math.floor(Math.random() * posiciones.length);
    posicionRandom2 = posiciones[posicionRandom2];
    let cuadroElegido2 = document.getElementById(`back-${posicionRandom2}`);
    cuadroElegido2.src = arrayDeJugadores[jugadorAleatorio].src;
    let posicionABorrar2 = posiciones.indexOf(posicionRandom2);
    posiciones.splice(posicionABorrar2, 1);

    let imagenABorrar = arrayDeJugadores[jugadorAleatorio];
    imagenABorrar = arrayDeJugadores.indexOf(imagenABorrar);
    arrayDeJugadores.splice(imagenABorrar, 1);
  }
  // return posiciones;
}
randomizarImagenes();

let $tarjetas = document.querySelectorAll(".cuadro");
$tarjetas.forEach(function ($tarjeta) {
  $tarjeta.onclick = recibirClicks;
});

let numerosIdTarjetas = [];
let arrayComparativo = [];
let cuadrosBloqueados = [];

function recibirClicks(e) {
  let $tarjeta = e.target;
  $tarjeta = $tarjeta.id;
  let numeroID = $tarjeta.match(/\d/g);

  if (numeroID.length > 1) {
    numeroID = numeroID.join("");
  }
  numeroID = numeroID.toString();
  numerosIdTarjetas.push(numeroID);

  if (numerosIdTarjetas.length === 1) {
    let $back1 = document.getElementById(`back-${numerosIdTarjetas[0]}`);
    $back1.style.backfaceVisibility = "visible";
    $back1.style.transform = "rotateY(0deg)";
    $back1.style.cursor = "auto";
    arrayComparativo.push($back1);
    let $cuadro1 = document.getElementById(`pos-${numerosIdTarjetas[0]}`);
    $cuadro1.onclick = function () {};
  } else if (numerosIdTarjetas.length > 1) {
    let $back2 = document.getElementById(`back-${numerosIdTarjetas[1]}`);
    $back2.style.backfaceVisibility = "visible";
    $back2.style.transform = "rotateY(0deg)";
    $back2.style.cursor = "auto";
    arrayComparativo.push($back2);
    let $cuadro2 = document.getElementById(`pos-${numerosIdTarjetas[1]}`);
    $cuadro2.onclick = function () {};

    if (numerosIdTarjetas.length === 2) {
      let $tarjetas = document.querySelectorAll(".cuadro");
      $tarjetas.forEach(function ($tarjeta) {
        $tarjeta.onclick = function () {};
        $tarjeta.style.pointerEvents = "none";
      });
    }
    comparar($back1, $cuadro1, $back2, $cuadro2);
  }
}

function bloquearCuadros(cuadros) {
  if (cuadros.length > 0) {
    cuadros.forEach(function (cuadro) {
      cuadro.onclick = function () {};
    });
  }
}

contadorDeAciertos = 0;

function comparar(back1, cuadro1, back2, cuadro2) {
  if (arrayComparativo[0].src === arrayComparativo[1].src) {
    back1.classList.add("encontrado");
    back2.classList.add("encontrado");
    cuadrosBloqueados.push(cuadro1);
    cuadrosBloqueados.push(cuadro2);

    numerosIdTarjetas = [];
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
  $back1.style.cssText = "";
  $back2.style.cssText = "";

  $cuadro1.onclick = recibirClicks;
  $cuadro2.onclick = recibirClicks;

  tarjetas = document.querySelectorAll(".cuadro");
  tarjetas.forEach(function ($tarjeta) {
    $tarjeta.onclick = recibirClicks;
    $tarjeta.style.pointerEvents = "all";
  });

  numerosIdTarjetas = [];
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

  obtenerCartas();

  obtenerReversoDeTarjetas();

  randomizarImagenes();
  contadorDeAciertos = 0;
  arrayComparativo = [];
  // numerosIdTarjetas = [];
  cuadrosBloqueados = [];

  tarjetas = document.querySelectorAll(".cuadro");
  tarjetas.forEach(function ($tarjeta) {
    $tarjeta.onclick = recibirClicks;
  });
  $divGanaste = document.getElementById("ganaste");
  $divGanaste.classList.add("d-none");
}
