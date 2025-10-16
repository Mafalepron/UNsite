# Images Directory

This directory contains optimized images for the UNevent website.

## Image Optimization Guidelines

### Formats
- **JPEG**: For photographs and complex images
- **PNG**: For images with transparency
- **WebP**: For modern browsers (with JPEG fallback)
- **SVG**: For icons and simple graphics

### Sizes
- **Hero images**: 1920x1080px (16:9 ratio)
- **Card images**: 400x300px (4:3 ratio)
- **Team avatars**: 200x200px (1:1 ratio)
- **Icons**: 64x64px or SVG

### Optimization
- Compress JPEGs to 85% quality
- Use progressive JPEGs for better loading
- Optimize PNGs with tools like TinyPNG
- Convert to WebP for modern browsers

## Current Images

### Hero Slideshow
- `hero-1.jpg` - Театрализованное представление
- `hero-2.jpg` - Городской фестиваль  
- `hero-3.jpg` - Бизнес-конференция
- `hero-4.jpg` - Семейное торжество

### Service Cards
- `service-art.jpg` - Событие как искусство
- `service-team.jpg` - Тимбилдинги
- `service-city.jpg` - Атмосфера города
- `service-business.jpg` - Бизнес-события
- `service-kids.jpg` - Лучшее детям
- `service-intellectual.jpg` - Интеллектуальные активности

### Team Photos
- `team-julia.jpg` - Юлия Никитина
- `team-alexander.jpg` - Александр
- `team-irakli.jpg` - Ираклий

## Usage

```html
<!-- Responsive image with lazy loading -->
<img 
  src="placeholder.jpg" 
  data-src="image.jpg" 
  data-srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  class="lazyload"
  alt="Description"
>
```

## Optimization Script

Run the optimization script to compress images:

```bash
npm run optimize:images
```
