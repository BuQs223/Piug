// ========================================
// FORM-VALIDATION.JS - Contact Form Validation
// ========================================

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });

        // Real-time validation on blur
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Remove error on input
            input.addEventListener('input', () => {
                input.classList.remove('error');
                input.classList.remove('success');
            });
        });
    }

    validateForm() {
        const name = this.form.querySelector('#name');
        const email = this.form.querySelector('#email');
        const phone = this.form.querySelector('#phone');
        const message = this.form.querySelector('#message');

        let isValid = true;

        // Validate name
        if (!this.validateField(name)) isValid = false;

        // Validate email
        if (!this.validateField(email)) isValid = false;

        // Validate phone
        if (!this.validateField(phone)) isValid = false;

        // Validate message
        if (!this.validateField(message)) isValid = false;

        if (isValid) {
            this.handleSuccess();
        }
    }

    validateField(field) {
        const fieldType = field.getAttribute('type') || field.tagName.toLowerCase();
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Check if required
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Specific validations
        if (isValid && value !== '') {
            switch (field.id) {
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Numele trebuie să aibă cel puțin 2 caractere';
                    }
                    break;

                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Adresa de email trebuie să fie validă';
                    }
                    break;

                case 'phone':
                    if (!this.isValidRomanianPhone(value)) {
                        isValid = false;
                        errorMessage = 'Va rugam introduceti un numar de telefon valid (e.g., +40712345678 or 0712345678)';
                    }
                    break;

                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Mesajul trebuie să aibă cel puțin 10 caractere';
                    }
                    break;
            }
        }

        // Update UI
        this.updateFieldUI(field, isValid, errorMessage);

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidRomanianPhone(phone) {
        // Romanian phone formats:
        // +40712345678 (international)
        // 0712345678 (national)
        // Remove spaces and dashes for validation
        const cleanPhone = phone.replace(/[\s-]/g, '');
        const romanianPhoneRegex = /^(\+40|0)[67]\d{8}$/;
        return romanianPhoneRegex.test(cleanPhone);
    }

    updateFieldUI(field, isValid, errorMessage) {
        const errorDiv = field.nextElementSibling;

        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorDiv && errorDiv.classList.contains('form-error')) {
                errorDiv.textContent = '';
            }
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            if (errorDiv && errorDiv.classList.contains('form-error')) {
                errorDiv.textContent = errorMessage;
            }
        }
    }

    handleSuccess() {
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        console.log('Form submitted successfully:', data);

        // Show success message
        const successMsg = this.form.querySelector('.form-success');
        if (successMsg) {
            successMsg.classList.add('show');

            // Hide after 5 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }

        // Reset form
        this.form.reset();

        // Remove validation classes
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });

        // Track with Google Analytics
        if (window.gtag) {
            window.gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('contactForm');
});
