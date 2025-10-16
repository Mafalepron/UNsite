/**
 * Main application entry point
 * Initializes all modules and handles global functionality
 */

// Import modules
import { Navigation } from './navigation.js';
import { AnimationController } from './animations.js';
import { FormHandler } from './form.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    console.log('🚀 UNevent website initialized');
    
    // Initialize modules
    this.navigation = new Navigation();
    this.animations = new AnimationController();
    this.formHandler = new FormHandler();
    
    // Setup global event listeners
    this.setupGlobalEvents();
    
    // Initialize performance optimizations
    this.optimizePerformance();
  }

  setupGlobalEvents() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
  }

  handleResize() {
    // Recalculate animations if needed
    if (this.animations) {
      // Trigger recalculation for any animations that depend on viewport
      window.dispatchEvent(new Event('resize'));
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when page is not visible
      document.body.style.animationPlayState = 'paused';
    } else {
      // Resume animations when page becomes visible
      document.body.style.animationPlayState = 'running';
    }
  }

  handleKeyboardNavigation(e) {
    // Handle escape key globally
    if (e.key === 'Escape') {
      // Close any open modals or menus
      const openMenus = document.querySelectorAll('.nav__panel.open');
      openMenus.forEach(menu => menu.classList.remove('open'));
    }
  }

  optimizePerformance() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup service worker if available
    this.setupServiceWorker();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700;800&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
}

// Initialize the application
new App();
