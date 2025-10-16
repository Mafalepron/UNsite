/**
 * Form handling functionality
 * Manages contact form submission and validation
 */

class FormHandler {
  constructor() {
    this.form = document.querySelector('.form');
    this.init();
  }

  init() {
    if (this.form) {
      this.setupFormValidation();
      this.handleFormSubmission();
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Clear previous errors
    this.clearFieldError(field);
    
    if (isRequired && !value) {
      this.showFieldError(field, 'Это поле обязательно для заполнения');
      return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Введите корректный email');
        return false;
      }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        this.showFieldError(field, 'Введите корректный номер телефона');
        return false;
      }
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 14px;
      margin-top: 4px;
    `;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  handleFormSubmission() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        this.submitForm();
      }
    });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('.form__submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    try {
      // Simulate form submission
      await this.simulateSubmission();
      
      // Show success message
      this.showSuccessMessage();
      this.form.reset();
      
    } catch (error) {
      // Show error message
      this.showErrorMessage();
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  async simulateSubmission() {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  showSuccessMessage() {
    this.showMessage('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
  }

  showErrorMessage() {
    this.showMessage('Произошла ошибка. Попробуйте еще раз или свяжитесь с нами напрямую.', 'error');
  }

  showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    messageElement.style.cssText = `
      padding: 16px;
      border-radius: var(--radius-sm);
      margin-top: 16px;
      font-weight: 500;
      text-align: center;
      ${type === 'success' 
        ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);'
        : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);'
      }
    `;
    messageElement.textContent = text;
    
    this.form.appendChild(messageElement);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.remove();
        }
      }, 5000);
    }
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
