const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const background = document.querySelector(".background");
const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");

let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
highscoreElement.textContent = `Record: ${highscore}`;

const jump = () => {
  sonic.classList.add("jump");
  sonic.src = "assets/images/sonic-jump.gif.gif";
  setTimeout(() => {
    sonic.classList.remove("jump");
    sonic.src = "assets/images/sonic.gif.gif";
  }, 900);
};

const showGameOverScreen = () => {
  const gameOverScreen = document.createElement("div");
  gameOverScreen.classList.add("game-over-screen");
  const gameOverText = document.createElement("h1");
  gameOverText.classList.add("game-over-text");
  gameOverText.textContent = "Game Over";
  const restartButton = document.createElement("button");
  restartButton.classList.add("restart-button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", () => {
    location.reload();
  });
  gameOverScreen.appendChild(gameOverText);
  gameOverScreen.appendChild(restartButton);
  document.body.appendChild(gameOverScreen);
};

const loop = setInterval(() => {
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");
  if (eggmanPosition < window.innerWidth * 0.27 && eggmanPosition > 0 && sonicPosition < window.innerHeight * 0.25) {
    eggman.style.left = `${eggmanPosition}px`;
    sonic.src = "assets/images/sonic-loss.gif.gif";
    sonic.style.width = "240px";
    sonic.style.height = "240px";
    showGameOverScreen();
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      highscoreElement.textContent = `Record: ${highscore}`; 
    }
    clearInterval(loop);
    setTimeout(() => {
      sonic.src = "assets/images/sonic-loss-static.png";
    }, 1000);
    setTimeout(() => {
      background.src = "assets/images/background-static.png";
    }, 1);
    setTimeout(() => {
      eggman.src = "assets/images/eggman-static.png";
    }, 1);
  } else if (eggmanPosition < 0) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    eggman.style.right = '-15vw';
    setTimeout(() => {
      eggman.style.animation = '2s eggman_animation infinite linear';
    }, 10);
  }
}, 10);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});