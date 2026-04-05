/**
 * Google Apps Script - Webhook для уведомлений о новых заявках
 * 
 * Инструкция по установке:
 * 1. Откройте таблицу ответов формы
 * 2. Расширения → Apps Script
 * 3. Вставьте этот код
 * 4. Замените TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
 * 5. Сохраните (Ctrl+S)
 * 6. Триггеры → Добавить триггер:
 *    - Функция: onFormSubmit
 *    - Событие: При отправке формы
 *    - Тип: из таблицы
 * 7. Разрешите доступ при запросе
 */

// ===== НАСТРОЙКИ =====
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Замените на токен вашего бота
const TELEGRAM_CHAT_ID = '479231184'; // ID чата (можно получить через @userinfobot)

/**
 * Главная функция - вызывается при каждой новой заявке
 */
function onFormSubmit(e) {
  try {
    // Получаем данные из формы
    const values = e.values;
    const timestamp = values[0]; // Отметка времени
    const name = values[1] || 'Не указано'; // Имя
    const contact = values[2] || 'Не указано'; // Контакт
    const service = values[3] || 'Не указано'; // Услуга
    
    // Формируем сообщение
    const message = `
🔔 <b>Новая заявка с лендинга 223-ФЗ</b>

👤 <b>Имя:</b> ${name}
📱 <b>Контакт:</b> ${contact}
📋 <b>Услуга:</b> ${service}
⏰ <b>Время:</b> ${timestamp}

🔗 <a href="https://docs.google.com/spreadsheets/d/ YOUR_SHEET_ID_HERE">Открыть таблицу</a>
    `.trim();
    
    // Отправляем в Telegram
    sendTelegramMessage(message);
    
    Logger.log('Уведомление успешно отправлено');
    
  } catch (error) {
    Logger.log('Ошибка отправки уведомления: ' + error.toString());
    // Отправляем сообщение об ошибке
    sendTelegramMessage(`❌ <b>Ошибка webhook:</b>\n${error.toString()}`);
  }
}

/**
 * Отправляет сообщение в Telegram через Bot API
 */
function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const payload = {
    'chat_id': TELEGRAM_CHAT_ID,
    'text': text,
    'parse_mode': 'HTML'
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  
  if (!result.ok) {
    throw new Error('Telegram API error: ' + result.description);
  }
  
  return result;
}

/**
 * Тестовая функция - для проверки работы
 * Запустите вручную из редактора Apps Script
 */
function testWebhook() {
  const testEvent = {
    values: [
      new Date().toISOString(),
      'Тестовый Пользователь',
      '+7 (999) 123-45-67',
      'Подготовка заявок по 223-ФЗ'
    ]
  };
  
  onFormSubmit(testEvent);
}
