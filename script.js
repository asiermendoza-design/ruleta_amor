const planes = [
  "Cena improvisada en casa 🕯️",
  "Paseo largo hablando de todo 🌙",
  "Recrear nuestra primera cita 💕",
  "Noche sin móviles 📵",
  "Carta escrita desde el corazón 💌",
  "Plan secreto elegido por mí ✨"
];

const UNA_SEMANA = 7 * 24 * 60 * 60 * 1000;

function girar() {
  const ultimoGiro = localStorage.getItem("ultimoGiro");
  const ahora = new Date().getTime();

  if (ultimoGiro && ahora - ultimoGiro < UNA_SEMANA) {
    mostrarContador(UNA_SEMANA - (ahora - ultimoGiro));
    return;
  }

  const ruleta = document.querySelector(".ruleta");
  const resultado = document.getElementById("resultado");

  ruleta.style.transform = "rotate(720deg)";

  setTimeout(() => {
    const plan = planes[Math.floor(Math.random() * planes.length)];
    resultado.textContent = plan;
    localStorage.setItem("ultimoGiro", ahora);
    ruleta.style.transform = "rotate(0deg)";
    mostrarContador(UNA_SEMANA);
  }, 1000);

  function mostrarContador(tiempo) {
  const contador = document.getElementById("contador");

  const intervalo = setInterval(() => {
    tiempo -= 1000;

    if (tiempo <= 0) {
      contador.textContent = "💖 Ya puedes girar de nuevo";
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(tiempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempo / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((tiempo / (1000 * 60)) % 60);

    contador.textContent =
      `⏳ Próximo giro en ${dias}d ${horas}h ${minutos}m`;
  }, 1000);
}
}
