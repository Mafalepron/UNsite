/**
 * Animation functionality
 * Handles scroll animations and intersection observer
 */

class AnimationController {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.observeElements();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  }

  observeElements() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      this.observer.observe(el);
    });
  }

  // Method to add new elements to observe
  observeElement(element) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});
