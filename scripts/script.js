document.getElementById("btnStart").addEventListener("click", function() {
    document.querySelector(".home-screen").classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "game.html";
    }, 500);
});