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
  sonic.classList.add("jump");
  sonic.src = "assets/images/sonic-jump.gif.gif";

  // Remove a classe de pulo e restaura a imagem original após 900ms
  setTimeout(() => {
    sonic.classList.remove("jump");
    sonic.src = "assets/images/sonic.gif.gif";
  }, 900);
};

// Função para exibir a tela de Game Over
const showGameOverScreen = () => {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over-screen");

  // Cria o texto de Game Over
  const gameOverText = document.createElement("h1");
  gameOverText.classList.add("game-over-text");
  gameOverText.textContent = "Game Over";

  // Cria o botão de reiniciar
  const restartButton = document.createElement("button");
  restartButton.classList.add("restart-button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", () => {
    location.reload();
  });

  // Adiciona os elementos à tela de Game Over
  gameOverScreen.appendChild(gameOverText);
  gameOverScreen.appendChild(restartButton);
  document.body.appendChild(gameOverScreen);
};

// Loop principal do jogo para verificar colisões e atualizar o estado do jogo
const loop = setInterval(() => {
  // Obtém a posição atual do Eggman e do Sonic
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  // Verifica se houve colisão entre o Eggman e o Sonic
  if (eggmanPosition < window.innerWidth * 0.27 && eggmanPosition > 0 && sonicPosition < window.innerHeight * 0.25) {
    eggman.style.left = `${eggmanPosition}px`;

    // Muda a imagem do Sonic para a de derrota
    sonic.src = "assets/images/sonic-loss.gif.gif";
    sonic.style.width = "240px";
    sonic.style.height = "240px";

    // Exibe a tela de Game Over
    showGameOverScreen();

    // Atualiza o recorde se o score atual for maior
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      highscoreElement.textContent = `Record: ${highscore}`; 
    }

    // Para o loop do jogo
    clearInterval(loop);

    // Substitui o GIF do Sonic por uma imagem estática
    setTimeout(() => {
      sonic.src = "assets/images/sonic-loss-static.png";
    }, 1000);

    // Substitui o GIF do background por uma imagem estática
    setTimeout(() => {
      background.src = "assets/images/background-static.png";
    }, 1);

    // Substitui o GIF do Eggman por uma imagem estática
    setTimeout(() => {
      eggman.src = "assets/images/eggman-static.png";
    }, 1);

  } else if (eggmanPosition < 0) {
    // Incrementa o contador de pontos quando o Eggman sai da tela
    score++;
    scoreElement.textContent = `Score: ${score}`;
    // Reinicia a posição do Eggman para continuar o jogo
    eggman.style.right = '-15vw';
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