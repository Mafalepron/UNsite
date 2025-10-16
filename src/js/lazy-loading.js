/**
 * Lazy Loading functionality
 * Handles image lazy loading and optimization
 */

class LazyLoader {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
      this.observeImages();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
  }

  observeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.observer.observe(img);
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
    
    if (srcset) {
      img.srcset = srcset;
      img.removeAttribute('data-srcset');
    }
    
    // Add loaded class for styling
    img.classList.add('loaded');
    
    // Handle load error
    img.addEventListener('error', () => {
      this.handleImageError(img);
    });
  }

  handleImageError(img) {
    console.warn('Failed to load image:', img.dataset.src);
    
    // Add error class for styling
    img.classList.add('error');
    
    // Optionally set a fallback image
    if (img.dataset.fallback) {
      img.src = img.dataset.fallback;
    }
  }

  loadAllImages() {
    // Fallback for browsers without IntersectionObserver
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.loadImage(img);
    });
  }

  // Method to add new images to lazy loading
  observeImage(img) {
    if (this.observer) {
      this.observer.observe(img);
    } else {
      this.loadImage(img);
    }
  }
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
});
