const sonic = document.querySelector(".sonic");
const eggman = document.querySelector(".eggman");
const fundo = document.querySelector(".fundo");

const jump = () => {
  sonic.classList.add("jump");
  sonic.src = "assets/images/sonic-jump.gif.gif";

  setTimeout(() => {
    sonic.classList.remove("jump");
    sonic.src = "assets/images/sonic.gif.gif";
  }, 900);
};

const loop = setInterval(() => {
  const eggmanPosition = eggman.offsetLeft;
  const sonicPosition = +window
    .getComputedStyle(sonic)
    .bottom.replace("px", "");

  if (eggmanPosition < 450 && eggmanPosition > 0 && sonicPosition < 220) {
    eggman.style.animation = "none";
    eggman.style.left = `${eggmanPosition}px`;

    sonic.style.animation = "none";
    sonic.src = "assets/images/sonic-loss.gif.gif";
    sonic.style.width = "240px";

    fundo.src = "assets/images/game-over.png.png";
  }
}, 10);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});