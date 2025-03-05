// Seleciona os elementos do DOM
const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const fundo = document.querySelector(".fundo");

// Função para fazer o Sonic pular
const jump = () => {
  // Adiciona a classe de pulo e muda a imagem do Sonic
  sonic.classList.add("jump");
  sonic.src = "assets/images/sonic-jump.gif.gif";

  // Remove a classe de pulo e restaura a imagem original após 900ms
  setTimeout(() => {
    sonic.classList.remove("jump");
    sonic.src = "assets/images/sonic.gif.gif";
  }, 900);
};

// Loop principal do jogo para verificar colisões e atualizar o estado do jogo
const loop = setInterval(() => {
  // Obtém a posição atual do Eggman e do Sonic
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  // Verifica se houve colisão entre Sonic e Eggman
  if (eggmanPosition < 450 && eggmanPosition > 0 && sonicPosition < 220) {
    // Para a animação do Eggman
    eggman.style.animation = "none";
    eggman.style.left = `${eggmanPosition}px`;

    // Para a animação do Sonic e muda a imagem para a de perda
    sonic.style.animation = "none";
    sonic.src = "assets/images/sonic-loss.gif.gif";
    sonic.style.width = "240px";

    // Muda a imagem de fundo para a de game over
    fundo.src = "assets/images/game-over.png.png";
  }
}, 10);

// Adiciona o evento de tecla para pular
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});