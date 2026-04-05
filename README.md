# Лендинги на основе Wordstat + YandexART

Статические лендинги, созданные на основе данных из Яндекс.Wordstat с графикой от YandexART.

## 📁 Структура

```
landings/
├── ai-agents/          # Лендинг по AI-агентам
│   ├── index.html
│   ├── style.css
│   ├── wordstat-data.json
│   └── assets/
│
└── consulting-223fz/   # Лендинг по консультациям 223-ФЗ
    ├── index.html
    ├── style.css
    ├── wordstat-data.json
    └── assets/
```

## 🚀 Деплой на GitHub Pages

Этот репозиторий настроен для деплоя на GitHub Pages.

После пуша в репозиторий, лендинги будут доступны по адресу:
- `https://{username}.github.io/{repo-name}/ai-agents/`
- `https://{username}.github.io/{repo-name}/consulting-223fz/`

## 🛠 Технологии

- **Wordstat API** — сбор ключевых запросов
- **YandexART** — генерация изображений
- **HTML/CSS** — статические лендинги

## 📝 Данные

Каждый лендинг содержит `wordstat-data.json` с реальными данными из Яндекс.Wordstat:
- Топ запросы по нише
- Динамика поисковых запросов
- География запросов
