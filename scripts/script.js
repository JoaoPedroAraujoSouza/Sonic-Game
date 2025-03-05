document.getElementById("btnStart").addEventListener("click", function() {
    document.querySelector(".tela-inicial").classList.add("fade-out");

    // Redireciona após a animação terminar
    setTimeout(() => {
        window.location.href = "game.html";
    }, 500);
});