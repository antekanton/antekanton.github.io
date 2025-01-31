document.addEventListener("DOMContentLoaded", function () {
    let tg = window.Telegram.WebApp;
    tg.expand(); // Разворачиваем WebApp на весь экран

    document.getElementById("okButton").addEventListener("click", function () {
        let name = document.getElementById("nameInput").value.trim();
        if (name) {
            document.getElementById("outputText").innerText = `Привет, ${name}!`;
        } else {
            document.getElementById("outputText").innerText = "Введите имя!";
        }
    });
});
