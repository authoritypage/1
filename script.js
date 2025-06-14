//
// The Grid Digest - Script.js
//
// Author: Your Name/Organization
// Version: 1.0.1
//
// Contains:
// - Mobile navigation toggle
// - Smooth scrolling for anchor links
// - Newsletter subscription form validation
// - Dynamic year in footer
// - (Optional) Dark/Light theme toggle
//

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Prevents background scroll when overlay is open
    });

    // Close nav when a link is clicked (for single page navigation)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Newsletter Subscription Form Validation ---
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const subscribeSuccess = document.getElementById('subscribeSuccess');

    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailInput.value.trim()) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Email address cannot be empty.';
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.textContent = '';
        }

        if (isValid) {
            console.log('Form submitted successfully with email:', emailInput.value);
            subscribeSuccess.style.display = 'block';
            emailInput.value = '';
            emailInput.setAttribute('aria-invalid', 'false');
            emailError.textContent = '';

            setTimeout(() => {
                subscribeSuccess.style.display = 'none';
            }, 5000);
        } else {
            emailInput.setAttribute('aria-invalid', 'true');
            subscribeSuccess.style.display = 'none';
        }
    });

    emailInput.addEventListener('focus', () => {
        emailInput.classList.remove('invalid');
        emailError.textContent = '';
        emailInput.setAttribute('aria-invalid', 'false');
    });

    // --- 4. Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
