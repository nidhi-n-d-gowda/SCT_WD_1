/**
 * SkillCraft Technology — Task 01
 * Responsive Landing Page with Interactive Navigation Menu
 * JavaScript Interactions & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    /* ==========================================================================
       1. FIXED NAVIGATION & SCROLL STYLE TRANSITIONS
       ========================================================================== */
    function handleScroll() {
        // Toggle header scrolled class (changes background opacity, blur & shadow)
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Section Detection while scrolling (ScrollSpy)
        let currentSectionId = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial execution

    /* ==========================================================================
       2. MOBILE HAMBURGER MENU DRAWER
       ========================================================================== */
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile drawer when clicking any navigation link
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Smooth scroll to section
                const targetId = item.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                // Close menu drawer
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================================================
       3. CONTACT FORM VALIDATION & INTERACTION
       ========================================================================== */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            let isValid = true;

            // Reset validation errors
            [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('invalid'));
            [nameError, emailError, messageError].forEach(msg => msg.classList.remove('visible'));

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                nameError.classList.add('visible');
                isValid = false;
            }

            // Email validation (simple regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                emailError.classList.add('visible');
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('invalid');
                messageError.classList.add('visible');
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`;

                contactForm.reset();

                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
});
