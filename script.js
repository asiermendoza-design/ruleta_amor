// ------------------- PORTADA -------------------
const btnEmpezar = document.getElementById("btn-empezar");
const portada = document.getElementById("portada");
const juego = document.getElementById("juego");

btnEmpezar.addEventListener("click", () => {
  portada.style.opacity = "0";
  setTimeout(() => {
    portada.style.display = "none";
    juego.style.display = "block";
    // Mostrar texto de explicación
    iniciarExplicacion();
  }, 1500);
});

// ------------------- TEXTO DE EXPLICACIÓN -------------------
const textoExplicacion = document.getElementById("texto-explicacion");
const btnJugar = document.getElementById("btn-jugar");

function iniciarExplicacion() {
  const mensaje = "Este año vamos a disfrutar todo el mes de febrero juntos. Cada fin de semana elegiremos un plan especial con la ruleta para vivir momentos únicos y memorables.";
  let i = 0;

  function escribir() {
    if (i < mensaje.length) {
      textoExplicacion.textContent += mensaje.charAt(i);
      i++;
      textoExplicacion.style.opacity = "1";
      setTimeout(escribir, 50); // transición más lenta
    } else {
      btnJugar.style.display = "inline-block";
    }
  }

  escribir();
}

// ------------------- INICIAR JUEGO -------------------
btnJugar.addEventListener("click", () => {
  generarCalendario();
});

// ------------------- PLANES -------------------
const planes = [
  "Café romántico por la mañana",
  "Paseo por librerías y chocolate caliente",
  "Microteatro para dos",
  "Cena italiana en casa",
  "Paseo por la naturaleza",
  "Noche de vinos y música",
  "Sesión de fotos divertida"
];

// ------------------- FUNCION CALENDARIO -------------------
function generarCalendario() {
  const mesDiv = document.getElementById("mes");
  mesDiv.innerHTML = "";

  const febrero = 1; // febrero
  const año = 2026;

  const primerDia = new Date(año, febrero-1, 1).getDay();
  const diasFebrero = 28;

  for(let i=0;i<primerDia;i++){
    const vacio = document.createElement("div");
    mesDiv.appendChild(vacio);
  }

  for(let dia=1; dia<=diasFebrero; dia++){
    const div = document.createElement("div");
    div.classList.add("dia");

    const fecha = new Date(año,febrero-1,dia);
    if(fecha.getDay()===6 || fecha.getDay()===0){
      div.classList.add("finde");
      div.textContent = dia;
      div.dataset.plan = ""; 
    } else {
      div.textContent = dia;
    }

    mesDiv.appendChild(div);
  }
}

// ------------------- GIRO DE LA RULETA -------------------
function girar() {
  const ruleta = document.querySelector(".circulo");
  const resultado = document.getElementById("resultado");

  const gradosExtra = Math.floor(Math.random()*720) + 720;
  ruleta.style.transform = `rotate(${gradosExtra}deg)`;

  setTimeout(() => {
    const plan = planes[Math.floor(Math.random()*planes.length)];
    resultado.textContent = plan;
    resultado.classList.add("mostrar");
    setTimeout(()=> resultado.classList.remove("mostrar"), 3000);

    // Asignar plan al primer fin de semana sin plan
    const dias = document.querySelectorAll(".dia.finde");
    for(let dia of dias){
      if(!dia.dataset.plan){
        dia.dataset.plan = plan;
        dia.textContent = `${dia.textContent}\n${plan}`;
        break;
      }
    }

    ruleta.style.transform = "rotate(0deg)";
  }, 2000);
}


