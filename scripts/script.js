// Seleciona o botão de iniciar e adiciona um evento de clique
document.getElementById("btnStart").addEventListener("click", function() {
    // Adiciona a classe de fade-out à tela inicial
    document.querySelector(".tela-inicial").classList.add("fade-out");

    // Redireciona para a página do jogo após a animação terminar
    setTimeout(() => {
        window.location.href = "game.html";
    }, 500);
});