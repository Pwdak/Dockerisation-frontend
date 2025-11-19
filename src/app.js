document.getElementById("actionBtn").addEventListener("click", () => {
    const res = document.getElementById("result");
    res.textContent = "🎉 Votre frontend fonctionne parfaitement dans Docker !";
    res.classList.add("fade-in");
});