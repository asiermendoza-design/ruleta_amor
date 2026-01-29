// 1️⃣ TEXTO INICIAL
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

// 2️⃣ INICIAR JUEGO
function iniciarJuego() {
  document.getElementById("intro").classList.remove("activo");
  document.getElementById("ruleta").classList.add("activo");
  document.getElementById("musica").play();
}

// 3️⃣ RULETA Y PLANES
const planes = [
  `☕ Café en Toma Café
📚 Librería Tipos Infames o La Central
🎭 Teatro pequeño o microteatro
🍝 Cena italiana en Trattoria Malatesta`,

  `🛍️ Paseo por el centro comercial
🍽️ Comer allí
🍿 Cine con palomitas
🏠 Vuelta tranquila a casa`,

  `🚗 Ruta a un pueblo cercano
🍽️ Comida en restaurante del pueblo
🌿 Paseo / ruta corta
🛋️ Cena en casa, manta y peli`,

  `☕ Desayuno en Federal Café o HanSo Café
🚶‍♀️ Paseo sin rumbo por Barrio de las Letras
🖼️ Museo Thyssen (una sala solo, sin prisas)
🍷 Cena tranquila en La Fisna 📵`,

  `🍳 Brunch en Carmencita Bar
🏙️ Mirador del Círculo de Bellas Artes
📸 Fotos juntos por Gran Vía
🍽️ Cena en Azotea del Círculo o Picalagartos`,

  `🍰 Merienda en La Duquesita
🎨 Taller creativo (cerámica, pintura, velas)
(Muchos en Malasaña o Lavapiés)
🍔 Cena informal en Goiko / Mad Mad Vegan
🎶 Copa tranquila después`,

  `🚗 Viaje y llegada a la casa rural
🍷 Cena y noche tranquila
🌿 Día de naturaleza y descanso
☕ Desayuno sin prisas y vuelta`
];

// 4️⃣ CONTADOR SEMANAL
const UNA_SEMANA = 7 * 24 * 60 * 60 * 1000;
let intervaloContador = null;

window.onload = () => {
  const ultimoGiro = localStorage.getItem("ultimoGiro");
  if (ultimoGiro) iniciarContador(ultimoGiro);
};

function girar() {
  const ahora = Date.now();
  const ultimoGiro = localStorage.getItem("ultimoGiro");

  if (ultimoGiro && ahora - ultimoGiro < UNA_SEMANA) return;

  const ruleta = document.querySelector(".circulo");
  ruleta.style.transform = "rotate(720deg)";

  setTimeout(() => {
    const plan = planes[Math.floor(Math.random() * planes.length)];
    document.getElementById("resultado").textContent = plan;

    localStorage.setItem("ultimoGiro", ahora);
    ruleta.style.transform = "rotate(0deg)";

    iniciarContador(ahora);
  }, 1000);
}

function iniciarContador(timestampInicio) {
  const contador = document.getElementById("contador");
  if (intervaloContador) clearInterval(intervaloContador);

  intervaloContador = setInterval(() => {
    const ahora = Date.now();
    const restante = UNA_SEMANA - (ahora - timestampInicio);

    if (restante <= 0) {
      contador.textContent = "💖 La ruleta vuelve a estar lista para nosotros";
      clearInterval(intervaloContador);
      localStorage.removeItem("ultimoGiro");
      return;
    }

    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);

    contador.textContent =
      `⏳ Próximo giro en ${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
}

