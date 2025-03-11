document.addEventListener("DOMContentLoaded", function () {
  const infoText = document.getElementById("infoText");
  const ipText = document.getElementById("ipText");
  const telegramIdText = document.getElementById("telegramIdText");

  infoText.innerHTML = `<h3>Информация о тебе</h3>`

  // Получение информации о Telegram пользователе
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  if (user) {
    telegramIdText.innerHTML = `<ul><li><strong>Telegram ID:</strong> ${user.id}</li></ul>`;
  }

  // Получение информации о пользователе через ipwho.is
  fetch('https://ipwho.is/')
    .then(response => response.json())
    .then(data => {
      ipText.innerHTML = `
                <ul>
                    <li><strong>IP-адрес:</strong> ${data.ip}</li>
                    <li><strong>Страна:</strong> ${data.country} (${data.country_code})</li>
                    <li><strong>Регион:</strong> ${data.region}</li>
                    <li><strong>Город:</strong> ${data.city}</li>
                    <li><strong>Провайдер:</strong> ${data.connection?.isp || 'Неизвестно'}</li>
                    <li><strong>Организация:</strong> ${data.connection?.org || 'Неизвестно'}</li>
                    <li><strong>Координаты:</strong> ${data.latitude}, ${data.longitude}</li>
                    <li><strong>Часовой пояс:</strong> ${data.timezone?.utc || 'Неизвестно'}</li>
                </ul>
            `;
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      ipText.innerHTML = "<p style='color: red;'>Не удалось получить данные.</p>";
    });

  // Добавление кнопки для доната через Telegram Stars
  tg.ready();
  tg.MainButton.setText("Дать 🌟 на еду").show();

  tg.MainButton.onClick(() => {
    tg.pay({
      slug: "donation", // Укажите ваш товар или slug в Telegram Pay
      success: (response) => {
        tg.sendData(JSON.stringify({ payment: response })); // Отправка данных боту
      },
      fail: (error) => {
        alert("Ошибка платежа: " + error);
      }
    });
  });
});
