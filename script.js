const planes = [
  "Cena a la luz de las velas 🕯️",
  "Paseo sin rumbo 🌙",
  "Noche de peli y manta 🎥",
  "Carta escrita a mano 💌",
  "Desayuno especial ☕",
  "Plan sorpresa ✨"
];

function girar() {
  const ruleta = document.querySelector(".ruleta");
  const resultado = document.getElementById("resultado");

  ruleta.style.transform = "rotate(720deg)";

  setTimeout(() => {
    const plan = planes[Math.floor(Math.random() * planes.length)];
    resultado.textContent = plan;
    ruleta.style.transform = "rotate(0deg)";
  }, 1000);
}
