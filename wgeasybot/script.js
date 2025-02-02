document.addEventListener("DOMContentLoaded", function () {
  const ipText = document.getElementById("ipText");
  const telegramIdText = document.getElementById("telegramIdText");

  // Получение информации о Telegram пользователе
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  if (user) {
    telegramIdText.innerHTML = `<p><strong>Твой Telegram ID:</strong> ${user.id}</p>`;
  }

  // Получение информации о пользователе через ipwho.is
  fetch('https://ipwho.is/')
    .then(response => response.json())
    .then(data => {
      ipText.innerHTML = `
                <h3>Информация о тебе</h3>
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
});
