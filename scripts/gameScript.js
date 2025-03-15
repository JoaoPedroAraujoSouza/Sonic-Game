// Seleciona os elementos do DOM
const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const background = document.querySelector(".background");
const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");

let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
highscoreElement.textContent = `Record: ${highscore}`;

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
  if (eggmanPosition < window.innerWidth * 0.27 && eggmanPosition > 0 && sonicPosition < window.innerHeight * 0.25) {
    // Para a animação do Eggman
    eggman.style.animation = "none";
    eggman.style.left = `${eggmanPosition}px`;

    // Para a animação do Sonic e muda a imagem para a de perda
    sonic.style.animation = "none";
    sonic.src = "assets/images/sonic-loss.gif.gif";
    sonic.style.width = "240px";

    // Muda a imagem de fundo para a de game over
    background.src = "assets/images/game-over.png.png";

    // Atualiza o recorde se o score atual for maior
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      highscoreElement.textContent = `Record: ${highscore}`; 
    }

    // Para o loop do jogo
    clearInterval(loop);
  } else if (eggmanPosition < 0) {
    // Incrementa o contador de pontos quando o Eggman sai da tela
    score++;
    scoreElement.textContent = `Score: ${score}`;
    // Reinicia a posição do Eggman para continuar o jogo
    eggman.style.right = '-15vw';
    eggman.style.animation = 'none';
    setTimeout(() => {
      eggman.style.animation = '2s eggman_animation infinite linear';
    }, 10);
  }
}, 10);

// Adiciona o evento de tecla para pular
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});