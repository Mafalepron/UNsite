/**
 * Navigation functionality
 * Handles scroll effects and mobile menu
 */

class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.navPanel = document.getElementById('navPanel');
    this.mobileMenuOpen = false;
    
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
  }

  handleScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.nav.classList.add('nav--scrolled');
      } else {
        this.nav.classList.remove('nav--scrolled');
      }
    });
  }

  handleMobileMenu() {
    // Create mobile menu button if it doesn't exist
    if (!document.getElementById('mobileMenuBtn')) {
      const mobileBtn = document.createElement('button');
      mobileBtn.id = 'mobileMenuBtn';
      mobileBtn.className = 'mobile-menu-btn';
      mobileBtn.innerHTML = '☰';
      mobileBtn.setAttribute('aria-label', 'Открыть меню');
      
      // Add styles for mobile button
      mobileBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 24px;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: var(--transition-fast);
      `;
      
      mobileBtn.addEventListener('mouseenter', () => {
        mobileBtn.style.background = 'rgba(139, 92, 246, 0.1)';
      });
      
      mobileBtn.addEventListener('mouseleave', () => {
        mobileBtn.style.background = 'none';
      });
      
      this.nav.querySelector('.nav__content').appendChild(mobileBtn);
    }

    const mobileBtn = document.getElementById('mobileMenuBtn');
    
    mobileBtn.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && 
          !this.navPanel.contains(e.target) && 
          !mobileBtn.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.navPanel.classList.add('open');
    this.mobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    this.navPanel.classList.remove('open');
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (this.mobileMenuOpen) {
            this.closeMobileMenu();
          }
        }
      });
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
