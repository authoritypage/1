//
// The Grid Digest - Script.js
//
// Author: Your Name/Organization
// Version: 1.0.0
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
                // Get the height of the fixed header
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
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Basic email validation regex
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
            emailError.textContent = ''; // Clear error
        }

        if (isValid) {
            // Simulate form submission (e.g., via AJAX to a backend)
            console.log('Form submitted successfully with email:', emailInput.value);

            // Display success message and clear form
            subscribeSuccess.style.display = 'block';
            emailInput.value = ''; // Clear input field
            emailInput.setAttribute('aria-invalid', 'false'); // Reset ARIA attribute
            emailError.textContent = ''; // Ensure error message is clear

            // Hide success message after a few seconds
            setTimeout(() => {
                subscribeSuccess.style.display = 'none';
            }, 5000);
        } else {
            emailInput.setAttribute('aria-invalid', 'true'); // Set ARIA attribute for accessibility
            subscribeSuccess.style.display = 'none'; // Hide success message if there's an error
        }
    });

    // Clear error message on input focus
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

    // --- 5. (Optional) Dark/Light Theme Toggle ---
    // Uncomment this section and the CSS variables in style.css to enable.
    // This example implements a simple inversion of black/white.
    /*
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.textContent = 'Toggle Theme';
    themeToggleBtn.classList.add('theme-toggle-btn');
    themeToggleBtn.setAttribute('aria-label', 'Toggle dark/light theme');
    document.body.appendChild(themeToggleBtn); // Or insert into header/footer

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Store user preference in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply stored theme on load
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    */
});

// Prevent scrolling when mobile nav is open (CSS is needed too)
// This adds a class 'no-scroll' to the body which you'd define in CSS:
// body.no-scroll { overflow: hidden; }
