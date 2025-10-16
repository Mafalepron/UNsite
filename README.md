# UNevent Website

> **Событие как искусство** — Профессиональная организация мероприятий полного цикла

Современный одностраничный сайт для event-агентства UNevent с модульной архитектурой, оптимизированной производительностью и адаптивным дизайном.

## 🚀 Особенности

- **Модульная архитектура** — Разделение на компоненты, стили и скрипты
- **Современный дизайн** — Градиенты, анимации, неоновые эффекты
- **Адаптивность** — Оптимизация для всех устройств
- **Производительность** — Ленивая загрузка, кэширование, оптимизация
- **SEO-оптимизация** — Семантическая разметка, мета-теги
- **Accessibility** — Поддержка клавиатурной навигации, ARIA-атрибуты

## 📁 Структура проекта

```
UNsite/
├── src/                          # Исходные файлы
│   ├── css/                      # Стили
│   │   ├── variables.css         # CSS-переменные
│   │   ├── reset.css             # Сброс стилей
│   │   ├── utilities.css         # Утилитарные классы
│   │   ├── components.css        # Компоненты
│   │   └── responsive.css        # Адаптивность
│   ├── js/                       # JavaScript
│   │   ├── main.js              # Главный файл
│   │   ├── navigation.js        # Навигация
│   │   ├── animations.js       # Анимации
│   │   ├── form.js             # Формы
│   │   └── lazy-loading.js     # Ленивая загрузка
│   ├── components/              # HTML-компоненты
│   │   ├── header.html
│   │   ├── hero.html
│   │   ├── services.html
│   │   ├── team.html
│   │   ├── contacts.html
│   │   └── footer.html
│   └── images/                   # Изображения
├── public/                       # Публичные файлы
│   ├── css/                      # Скомпилированные стили
│   ├── js/                       # Скомпилированные скрипты
│   ├── images/                   # Оптимизированные изображения
│   └── sw.js                     # Service Worker
├── docs/                         # Документация
├── index.html                    # Главная страница
├── package.json                  # Зависимости
├── vite.config.js               # Конфигурация сборки
└── README.md                     # Документация
```

## 🛠 Технологии

- **HTML5** — Семантическая разметка
- **CSS3** — Современные стили, Grid, Flexbox
- **JavaScript ES6+** — Модульная архитектура
- **Vite** — Быстрая сборка и разработка
- **Service Worker** — Кэширование и офлайн-режим
- **Intersection Observer** — Ленивая загрузка и анимации

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`

### Сборка для продакшена

```bash
npm run build
```

### Предварительный просмотр

```bash
npm run preview
```

## 📝 Доступные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера разработки |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Предварительный просмотр |
| `npm run lint` | Проверка кода |
| `npm run lint:fix` | Автоисправление ошибок |
| `npm run format` | Форматирование кода |
| `npm run optimize:images` | Оптимизация изображений |

## 🎨 Дизайн-система

### Цветовая палитра

```css
:root {
  --bg-dark: #0a0320;           /* Основной фон */
  --medium-purple: #1a0d40;     /* Средний фиолетовый */
  --accent-purple: #8b5cf6;     /* Акцентный фиолетовый */
  --neon-yellow: #facc15;       /* Неоновый желтый */
  --electric-blue: #06b6d4;     /* Электрический синий */
  --bright-pink: #ec4899;       /* Яркий розовый */
  --bg-card: #1e1b4b;           /* Фон карточек */
  --text-light: #f1f5f9;        /* Светлый текст */
  --text-muted: #94a3b8;         /* Приглушенный текст */
  --border: #4338ca;            /* Границы */
}
```

### Типографика

- **Основной шрифт**: Space Grotesk
- **Заголовки**: Satoshi
- **Декоративный**: Caveat

### Компоненты

- **Навигация** — Липкая навигация с эффектами
- **Hero** — Слайдшоу с анимациями
- **Карточки** — Интерактивные карточки услуг
- **Команда** — Профили участников
- **Форма** — Валидация и отправка
- **Футер** — Информация о компании

## 📱 Адаптивность

- **Mobile First** — Приоритет мобильных устройств
- **Breakpoints**:
  - Mobile: до 768px
  - Tablet: 769px - 1024px
  - Desktop: 1025px+

## ⚡ Производительность

### Оптимизации

- **Ленивая загрузка** изображений
- **Критический CSS** в `<head>`
- **Service Worker** для кэширования
- **Минификация** CSS и JS
- **Оптимизация изображений**
- **Preconnect** к внешним ресурсам

### Метрики

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Настройка

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=https://api.unevent.ru
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Конфигурация Vite

Настройки сборки в `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
});
```

## 📊 Аналитика

### Google Analytics

Добавьте ID отслеживания в `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Яндекс.Метрика

```html
<!-- Yandex.Metrica -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(YOUR_COUNTER_ID, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
</script>
```

## 🚀 Деплой

### GitHub Pages

1. Соберите проект: `npm run build`
2. Настройте GitHub Actions для автоматического деплоя
3. Укажите базовый URL в `vite.config.js`

### Netlify

1. Подключите репозиторий к Netlify
2. Настройте команды сборки:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. Установите Vercel CLI: `npm i -g vercel`
2. Запустите: `vercel`
3. Следуйте инструкциям

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add amazing feature'`
4. Отправьте в ветку: `git push origin feature/amazing-feature`
5. Создайте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Контакты

- **Email**: julia@unevent.ru
- **WhatsApp**: +7 (912) 345-67-89
- **Telegram**: @unevent
- **Город**: Санкт-Петербург

---

**UNevent** — Событие как искусство в Санкт-Петербурге 🎭✨
