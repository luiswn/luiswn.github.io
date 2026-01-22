// ===== Typing Animation =====
const typingTexts = [
    'PhD Candidate in Econometrics',
    'Time Series Econometrics',
    'Macroeconometrics',
    'Forecasting & Nowcasting',
    'Functional Data Analysis'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeText, typingSpeed);
}

// ===== Mobile Navigation =====
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Abstract Toggle =====
function initAbstractToggle() {
    document.querySelectorAll('.abstract-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const abstractFull = this.nextElementSibling;
            if (abstractFull) {
                abstractFull.classList.toggle('show');
                this.textContent = abstractFull.classList.contains('show') ? 'Show less' : 'Show more';
            }
        });
    });
}

// ===== Fade In Animation on Scroll =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.about-content, .paper-card, .teaching-card, .contact-item, .contact-link-card, .presentation-year'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== Navbar Background on Scroll =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 15, 26, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 15, 26, 0.85)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===== Active Nav Link Highlight =====
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#60a5fa';
            } else {
                link.style.color = '';
            }
        });
    });
}

// ===== Parallax Effect for Hero =====
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// ===== Contact Info Obfuscation =====
function initContactProtection() {
    // Email links
    const emailLinks = document.querySelectorAll('.email-link');
    emailLinks.forEach(link => {
        const user = link.dataset.user;
        const domain = link.dataset.domain;

        if (user && domain) {
            const email = user + '@' + domain;
            link.href = 'mailto:' + email;

            const textSpan = link.querySelector('.email-text');
            if (textSpan) {
                textSpan.textContent = email;
            }
        }
    });

    // Phone links
    const phoneLinks = document.querySelectorAll('.phone-link');
    phoneLinks.forEach(link => {
        const prefix = link.dataset.prefix;
        const number = link.dataset.number;

        if (prefix && number) {
            const displayPhone = prefix + ' ' + number;
            const telPhone = displayPhone.replace(/[\s-]/g, '');
            link.href = 'tel:' + telPhone;

            const textSpan = link.querySelector('.phone-text');
            if (textSpan) {
                textSpan.textContent = displayPhone;
            }
        }
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    initMobileNav();
    initSmoothScroll();
    initAbstractToggle();
    initScrollAnimations();
    initNavbarScroll();
    initActiveNavHighlight();
    initParallax();
    initContactProtection();
});

// ===== Reduce motion for accessibility =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}
