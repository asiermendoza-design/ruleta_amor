/* TEXTO INTRO */
const mensaje = 
"Esto no es un juego cualquiera.\n\n" +
"Es una excusa para parar el tiempo,\n" +
"para elegirnos una vez más,\n" +
"para recordar que, incluso en la rutina,\n" +
"siempre podemos sorprendernos.\n\n" +
"Cada semana, la ruleta decidirá.\n" +
"Pero lo importante no es el plan,\n" +
"sino que sea contigo.";

let i = 0;
const texto = document.getElementById("texto");
const boton = document.getElementById("btn-jugar");

function escribir() {
  if (i < mensaje.length) {
    texto.textContent += mensaje.charAt(i);
    i++;
    setTimeout(escribir, 50);
  } else {
    boton.style.display = "inline-block";
  }
}

escribir();

/* TRANSICIONES */
function irARecuerdos() {
  mostrar("recuerdos");
}

function irARuleta() {
  mostrar("ruleta");
}

function mostrar(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

/* RULETA */
const planes = [
  "Cena improvisada en casa 🕯️",
  "Paseo largo hablando de todo 🌙",
  "Recrear nuestra primera cita 💕",
  "Noche sin móviles 📵",
  "Carta escrita desde el corazón 💌",
  "Plan secreto ✨"
];

const UNA_SEMANA = 7 * 24 * 60 * 60 * 1000;

function girar() {
  const ultimo = localStorage.getItem("ultimoGiro");
  const ahora = Date.now();

  if (ultimo && ahora - ultimo < UNA_SEMANA) {
    mostrarContador(UNA_SEMANA - (ahora - ultimo));
    return;
  }

  const ruleta = document.querySelector(".circulo");
  ruleta.style.transform = "rotate(720deg)";

  setTimeout(() => {
    const plan = planes[Math.floor(Math.random() * planes.length)];
    document.getElementById("resultado").textContent = plan;
    localStorage.setItem("ultimoGiro", ahora);
    ruleta.style.transform = "rotate(0deg)";
    mostrarContador(UNA_SEMANA);
  }, 1000);
}

function mostrarContador(t) {
  const c = document.getElementById("contador");

  const i = setInterval(() => {
    t -= 1000;
    if (t <= 0) {
      c.textContent = "💖 Ya puedes girar de nuevo";
      clearInterval(i);
      return;
    }

    const d = Math.floor(t / (1000*60*60*24));
    const h = Math.floor((t / (1000*60*60)) % 24);
    const m = Math.floor((t / (1000*60)) % 60);

    c.textContent = `⏳ Próximo giro en ${d}d ${h}h ${m}m`;
  }, 1000);
}

