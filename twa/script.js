document.addEventListener("DOMContentLoaded", function () {
    const okButton = document.getElementById("okButton");
    const nameInput = document.getElementById("nameInput");
    const outputText = document.getElementById("outputText");
    const ipText = document.getElementById("ipText");
    const telegramIdText = document.getElementById("telegramIdText");
    const weatherText = document.getElementById("weatherText");

    // Получение информации о Telegram пользователе
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    if (user) {
        telegramIdText.textContent = `Ваш Telegram ID: ${user.id}`;
    }

    // Обработчик нажатия на кнопку "ОК"
    okButton.addEventListener("click", function () {
        const name = nameInput.value.trim();
        if (name) {
            outputText.textContent = `Привет, ${name}!`;
        } else {
            outputText.textContent = "Пожалуйста, введите имя.";
        }
    });

    // Получение IP-адреса пользователя
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            ipText.textContent = `Ваш IP-адрес: ${data.ip}`;
        })
        .catch(error => {
            console.error('Ошибка при получении IP-адреса:', error);
            ipText.textContent = "Не удалось получить IP-адрес.";
        });

    // Получение погоды в Новосибирске
    const apiKey = 'ceb09b476439eb6e5fa735ab1b554911'; // Замените на ваш API ключ OpenWeatherMap
    const cityId = '1496747'; // ID Новосибирска в OpenWeatherMap
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&lang=ru&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.weather && data.weather.length > 0) {
                const description = data.weather[0].description;
                const temperature = data.main.temp;
                weatherText.textContent = `Сейчас ${description}, температура: ${temperature.toFixed(1)}°C.`;
            } else {
                weatherText.textContent = "Не удалось получить данные о погоде.";
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);
            weatherText.textContent = "Не удалось получить данные о погоде.";
        });

  <!-- Start 1C Fitness JS Code Insert after jQuery. DO NOT CHANGE! -->
  <script src="https://reservi.ru/widget-fit1c.v2/js/config.js" data-fit-salon-id="81b1d726-a492-468f-90d9-1a0b4d3c4547"></script>
  <!-- Start 1C Fitness BLOCK Code Insert in place for schedule. DO NOT CHANGE! -->
  <div data-fit1c-calendar>Расписание работает на <a href="https://www.fitness1c.ru">1С:Фитнес клуб</a></div>
  <!-- End 1C Fitness BLOCK Code do not change! -->
});
