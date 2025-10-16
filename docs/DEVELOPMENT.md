# Руководство по разработке UNevent

## 🛠 Настройка среды разработки

### Требования

- **Node.js** 18+ 
- **npm** 8+ или **yarn** 1.22+
- **Git** 2.30+
- **VS Code** (рекомендуется)

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/unevent-website.git
cd unevent-website

# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

## 📁 Структура проекта

```
src/
├── css/                    # Стили
│   ├── variables.css       # CSS-переменные
│   ├── reset.css          # Сброс стилей
│   ├── utilities.css      # Утилитарные классы
│   ├── components.css      # Стили компонентов
│   └── responsive.css      # Адаптивные стили
├── js/                     # JavaScript
│   ├── main.js            # Главный файл
│   ├── navigation.js       # Навигация
│   ├── animations.js      # Анимации
│   ├── form.js           # Формы
│   └── lazy-loading.js   # Ленивая загрузка
├── components/             # HTML-компоненты
│   ├── header.html
│   ├── hero.html
│   ├── services.html
│   ├── team.html
│   ├── contacts.html
│   └── footer.html
└── images/                 # Изображения
    └── README.md
```

## 🎨 Работа со стилями

### CSS-архитектура

#### 1. Переменные (variables.css)
```css
:root {
  /* Цвета */
  --bg-dark: #0a0320;
  --accent-purple: #8b5cf6;
  --neon-yellow: #facc15;
  
  /* Типографика */
  --font-primary: 'Space Grotesk', sans-serif;
  --font-heading: 'Satoshi', sans-serif;
  
  /* Отступы */
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  
  /* Переходы */
  --transition-fast: 0.3s ease;
  --transition-normal: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
```

#### 2. Компоненты (components.css)
```css
/* Навигация */
.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  /* ... */
}

/* Карточки */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  /* ... */
}
```

#### 3. Утилиты (utilities.css)
```css
/* Отступы */
.mb-1 { margin-bottom: var(--spacing-xs); }
.mb-2 { margin-bottom: var(--spacing-sm); }
.mb-3 { margin-bottom: var(--spacing-md); }

/* Flexbox */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Принципы написания CSS

1. **Mobile First** — Начинайте с мобильных стилей
2. **Используйте переменные** — Для цветов, отступов, шрифтов
3. **БЭМ-методология** — Для именования классов
4. **Компонентный подход** — Один компонент = один файл

## 📱 Адаптивность

### Breakpoints

```css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

### Адаптивная типографика

```css
.hero__title {
  font-size: clamp(48px, 8vw, 88px);
  line-height: 1.1;
}
```

### Адаптивные сетки

```css
.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-lg);
}
```

## 🧩 JavaScript-модули

### Структура модуля

```javascript
/**
 * Описание модуля
 * Краткое описание функциональности
 */

class ModuleName {
  constructor() {
    this.property = value;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
  }

  setupEventListeners() {
    // Обработчики событий
  }

  // Публичные методы
  publicMethod() {
    // Логика метода
  }

  // Приватные методы
  #privateMethod() {
    // Внутренняя логика
  }
}

// Экспорт модуля
export { ModuleName };
```

### Принципы написания JS

1. **ES6+ синтаксис** — Используйте современный JavaScript
2. **Модульность** — Один модуль = одна ответственность
3. **Классы** — Для организации кода
4. **Async/Await** — Для асинхронных операций
5. **Обработка ошибок** — Try/catch блоки

## 🖼 Работа с изображениями

### Оптимизация

```bash
# Оптимизация изображений
npm run optimize:images

# Ручная оптимизация
imagemin src/images/*.{jpg,png} --out-dir=public/images
```

### Ленивая загрузка

```html
<!-- Обычное изображение -->
<img src="image.jpg" alt="Description">

<!-- Ленивая загрузка -->
<img 
  data-src="image.jpg" 
  data-srcset="image-400.jpg 400w, image-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  class="lazyload"
  alt="Description"
>
```

### Responsive изображения

```html
<picture>
  <source media="(min-width: 1024px)" srcset="image-large.jpg">
  <source media="(min-width: 768px)" srcset="image-medium.jpg">
  <img src="image-small.jpg" alt="Description">
</picture>
```

## 🧪 Тестирование

### Линтинг

```bash
# Проверка кода
npm run lint

# Автоисправление
npm run lint:fix
```

### Форматирование

```bash
# Форматирование кода
npm run format
```

### Тестирование производительности

```bash
# Lighthouse аудит
lighthouse http://localhost:3000 --output html

# Bundle analyzer
npm run build
npx vite-bundle-analyzer dist
```

## 🔧 Инструменты разработки

### VS Code расширения

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Настройки VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "css.validate": true,
  "scss.validate": true
}
```

## 📦 Управление зависимостями

### Добавление пакетов

```bash
# Production зависимость
npm install package-name

# Development зависимость
npm install -D package-name

# Обновление зависимостей
npm update
```

### package.json скрипты

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/js/**/*.js",
    "lint:fix": "eslint src/js/**/*.js --fix",
    "format": "prettier --write src/**/*.{js,css,html}",
    "optimize:images": "imagemin src/images/*.{jpg,png,svg} --out-dir=public/images"
  }
}
```

## 🐛 Отладка

### Chrome DevTools

1. **Elements** — Инспекция DOM
2. **Console** — JavaScript отладка
3. **Network** — Анализ загрузки ресурсов
4. **Performance** — Профилирование производительности
5. **Lighthouse** — Аудит производительности

### Отладка CSS

```css
/* Временные стили для отладки */
.debug {
  border: 2px solid red !important;
  background: rgba(255, 0, 0, 0.1) !important;
}
```

### Отладка JavaScript

```javascript
// Консольные сообщения
console.log('Debug info:', data);
console.warn('Warning:', message);
console.error('Error:', error);

// Точки останова
debugger;

// Профилирование
console.time('operation');
// ... код ...
console.timeEnd('operation');
```

## 🔄 Git workflow

### Ветки

- **main** — Продакшен
- **develop** — Разработка
- **feature/*** — Новые функции
- **bugfix/*** — Исправления
- **hotfix/*** — Критические исправления

### Коммиты

```bash
# Структура коммита
<type>(<scope>): <description>

# Примеры
feat(navigation): add mobile menu
fix(form): resolve validation error
style(css): update button styles
docs(readme): add deployment guide
```

### Pull Request

1. Создайте ветку от `develop`
2. Внесите изменения
3. Создайте Pull Request
4. Дождитесь code review
5. Merge после одобрения

## 📊 Мониторинг

### Производительность

```javascript
// Измерение времени загрузки
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
});

// Core Web Vitals
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.startTime);
  }
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

### Ошибки

```javascript
// Глобальная обработка ошибок
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Отправка в систему мониторинга
});

// Обработка необработанных Promise
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

## 🚀 Оптимизация

### Критический CSS

```html
<!-- В <head> -->
<style>
  /* Критические стили */
  .nav { /* ... */ }
  .hero { /* ... */ }
</style>
```

### Preloading

```html
<!-- Критические ресурсы -->
<link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-bg.jpg" as="image">
```

### Service Worker

```javascript
// Кэширование критических ресурсов
const CACHE_NAME = 'unevent-v1';
const urlsToCache = [
  '/',
  '/src/css/variables.css',
  '/src/css/components.css'
];
```

## 📋 Чек-лист разработки

### Перед коммитом
- [ ] Код отформатирован (`npm run format`)
- [ ] Линтинг без ошибок (`npm run lint`)
- [ ] Все тесты проходят
- [ ] Изображения оптимизированы
- [ ] Производительность проверена

### Перед PR
- [ ] Код ревью пройден
- [ ] Документация обновлена
- [ ] Тестирование на разных устройствах
- [ ] Lighthouse score > 90
- [ ] Accessibility проверена

---

Следуйте этому руководству для эффективной разработки проекта UNevent! 🚀
