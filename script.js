document.addEventListener("DOMContentLoaded", function () {
    let tg = window.Telegram.WebApp;
    tg.expand(); // Разворачиваем WebApp на весь экран

    // Получаем данные пользователя
    let userId = tg.initDataUnsafe?.user?.id || "Неизвестно";

    // Выводим Telegram ID при загрузке
    document.getElementById("telegramIdText").innerText = `Твой Telegram ID: ${userId}`;

    document.getElementById("okButton").addEventListener("click", function () {
        let name = document.getElementById("nameInput").value.trim();
        let outputText = document.getElementById("outputText");
        let ipText = document.getElementById("ipText");

        if (name) {
            outputText.innerText = `Привет, ${name}!`;

            // Запрашиваем IP-адрес пользователя
            fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                    ipText.innerText = `Твой IP: ${data.ip}`;
                })
                .catch(error => {
                    ipText.innerText = "Не удалось получить IP";
                    console.error("Ошибка получения IP:", error);
                });
        } else {
            outputText.innerText = "Введите имя!";
        }
    });
});
