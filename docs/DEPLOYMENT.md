# Руководство по развертыванию UNevent

## 🚀 Варианты развертывания

### 1. GitHub Pages (Рекомендуется)

#### Настройка автоматического деплоя

1. **Создайте GitHub Actions workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **Настройте GitHub Pages**:
   - Перейдите в Settings → Pages
   - Source: GitHub Actions
   - Сохраните настройки

#### Ручной деплой

```bash
# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Деплой через gh-pages
npm install -g gh-pages
gh-pages -d dist
```

### 2. Netlify

#### Автоматический деплой

1. **Подключите репозиторий** к Netlify
2. **Настройте команды сборки**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

#### Ручной деплой

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Логин в Netlify
netlify login

# Сборка и деплой
npm run build
netlify deploy --prod --dir=dist
```

#### Netlify.toml конфигурация

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 3. Vercel

#### Автоматический деплой

1. **Подключите репозиторий** к Vercel
2. **Настройки проекта**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Ручной деплой

```bash
# Установка Vercel CLI
npm install -g vercel

# Логин в Vercel
vercel login

# Деплой
vercel --prod
```

#### vercel.json конфигурация

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### 4. Firebase Hosting

#### Настройка

1. **Установите Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Инициализируйте проект**:
```bash
firebase init hosting
```

3. **Настройте firebase.json**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=0, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

4. **Деплой**:
```bash
npm run build
firebase deploy
```

## 🔧 Конфигурация для продакшена

### Переменные окружения

Создайте файл `.env.production`:

```env
VITE_API_URL=https://api.unevent.ru
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_YANDEX_METRIKA_ID=YANDEX_COUNTER_ID
VITE_SITE_URL=https://unevent.ru
```

### Оптимизация сборки

#### vite.config.js для продакшена

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lazysizes'],
          components: [
            './src/js/navigation.js',
            './src/js/animations.js',
            './src/js/form.js'
          ]
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
```

## 📊 Мониторинг и аналитика

### Google Analytics 4

Добавьте в `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: 'UNevent - Событие как искусство',
    page_location: window.location.href
  });
</script>
```

### Яндекс.Метрика

```html
<!-- Yandex.Metrica counter -->
<script type="text/javascript">
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(YOUR_COUNTER_ID, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
  });
</script>
```

### Hotjar (опционально)

```html
<!-- Hotjar Tracking Code -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## 🔒 Безопасность

### HTTPS и SSL

- Все платформы автоматически предоставляют SSL-сертификаты
- Убедитесь, что все внешние ресурсы загружаются по HTTPS

### Заголовки безопасности

Добавьте в конфигурацию хостинга:

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://mc.yandex.ru; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru
```

## 📈 Оптимизация производительности

### CDN настройка

#### Cloudflare
1. Подключите домен к Cloudflare
2. Включите Auto Minify для CSS, JS, HTML
3. Настройте Browser Cache TTL: 1 месяц
4. Включите Brotli сжатие

#### AWS CloudFront
```json
{
  "CacheBehaviors": {
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  }
}
```

### Оптимизация изображений

```bash
# Оптимизация всех изображений
npm run optimize:images

# Или вручную с ImageMagick
find src/images -name "*.jpg" -exec magick {} -quality 85 -strip {} \;
find src/images -name "*.png" -exec magick {} -strip {} \;
```

## 🧪 Тестирование перед деплоем

### Локальное тестирование

```bash
# Сборка для продакшена
npm run build

# Предварительный просмотр
npm run preview

# Проверка линтинга
npm run lint

# Форматирование кода
npm run format
```

### Lighthouse аудит

```bash
# Установка Lighthouse CLI
npm install -g lighthouse

# Аудит производительности
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

### Проверка доступности

```bash
# Установка axe-core
npm install -g @axe-core/cli

# Проверка доступности
axe http://localhost:3000
```

## 🔄 CI/CD Pipeline

### GitHub Actions полный workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run build
    - run: npm run preview &
    - run: sleep 10
    - run: lighthouse http://localhost:3000 --output json --output-path ./lighthouse.json

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📋 Чек-лист деплоя

### Перед деплоем
- [ ] Все тесты проходят
- [ ] Линтинг без ошибок
- [ ] Lighthouse score > 90
- [ ] Изображения оптимизированы
- [ ] Переменные окружения настроены
- [ ] Аналитика подключена

### После деплоя
- [ ] Сайт доступен по HTTPS
- [ ] Все страницы загружаются
- [ ] Формы работают
- [ ] Аналитика собирает данные
- [ ] Service Worker активен
- [ ] Мобильная версия работает

### Мониторинг
- [ ] Настроены уведомления об ошибках
- [ ] Мониторинг производительности
- [ ] Резервное копирование
- [ ] План отката

---

Следуйте этому руководству для успешного развертывания проекта UNevent! 🚀
