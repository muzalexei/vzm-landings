# fix-ai-landing.ps1
# Исправляет визуал лендинга AI-агентства:
# 1. Убирает заглушки контактов
# 2. Добавляет квиз-форму
# 3. Исправляет футер (только OpenClaw)
# 4. Удаляет Tech Stack с n8n/LangChain

$htmlPath = "C:\Users\User\.openclaw\workspace-dev\landings\ai\index.html"
$html = Get-Content $htmlPath -Raw -Encoding UTF8

# 1. Убираем заглушки контактов (cta-actions секция)
$html = $html -replace '(?s)<section id="contact".*?<div class="container">\s*<h2>Готовы создать AI-агента\?</h2>.*?<div class="cta-actions">.*?</div>\s*</div>\s*</section>', ''

# 2. Убираем старые формы (все 4 копии)
$html = $html -replace '(?s)<div class="form-container">\s*<form class="contact-form" id="contactForm">.*?</form>.*?</div></section>', ''

# 3. Исправляем футер - убираем Tech Stack
$html = $html -replace '<div class="footer-tech">\s*<p>Tech Stack: OpenClaw · n8n · LangChain · YandexGPT · Qwen · Claude</p>\s*</div>', ''

# 4. Исправляем footer-brand
$html = $html -replace '<strong>OpenClaw<span class="accent">AI</span></strong>', '<strong>AI<span class="accent">агентство</span></strong>'
$html = $html -replace '<p>Создание и внедрение AI-агентов с 2024</p>', '<p>Внедрение AI-агентов на базе OpenClaw с 2024</p>'

# 5. Упрощаем footer-links
$html = $html -replace '(?s)<div class="footer-links">.*?</div>', @'
<div class="footer-links">
                <a href="#services">Услуги</a>
                <a href="#cases">Кейсы</a>
                <a href="#faq">FAQ</a>
            </div>
'@

# 6. Hero подзаголовок - обновляем (уже должно быть правильно, но проверим)
$html = $html -replace '<p class="hero-sub">Автоматизируем лендинги, Telegram-ботов, базы знаний и соцсети на базе OpenClaw</p>', '<p class="hero-sub">Автоматизируем лендинги, Telegram-ботов, базы знаний и соцсети. Гарантия результата или вернём деньги.</p>'

# 7. Hero H1
$html = $html -replace '<h1>Создание <span class="accent">AI-агентов</span> для бизнеса</h1>', '<h1>AI-агенты под ключ <span class="accent">за 7 дней</span></h1>'

# 8. Hero статистика
$html = $html -replace '(?s)<div class="hero-stats">.*?</div>', @'
<div class="hero-stats">
                <div class="stat">
                    <div class="stat-number">10,718</div>
                    <div class="stat-label">запросов об AI-агентах/мес</div>
                </div>
                <div class="stat">
                    <div class="stat-number">95%</div>
                    <div class="stat-label">автономность настройки</div>
                </div>
                <div class="stat">
                    <div class="stat-number">7 дней</div>
                    <div class="stat-label">средний срок внедрения</div>
                </div>
            </div>
'@

# 9. Добавляем quiz.js перед </body>
$html = $html -replace '</body>', "<script src='quiz.js'></script>`n</body>"

$html | Out-File $htmlPath -Encoding UTF8
Write-Host "✅ Лендинг исправлен: заглушки убраны, квиз подключён, футер исправлен" -ForegroundColor Green
