// ------------------------------
// Portfolio JS
// ------------------------------

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        const open = mobileMenuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', open);
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}

// Navigation scroll effect
function initScrollEffect() {
    const nav = document.getElementById('navigation');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.scrollToSection = scrollToSection;

// Skills animation on scroll
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const animate = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !bar.classList.contains('animate')) {
                const level = bar.dataset.level;
                bar.classList.add('animate');
                bar.style.setProperty('--skill-width', level);
            }
        });
    };

    window.addEventListener('scroll', animate);
    animate();
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        showToast('Message sent!', 'Thanks for reaching out. I will respond shortly.', 'success');
        form.reset();
    });
}

// Toast notifications
function showToast(title, description, type='success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// Intersection Observer for fade-in
function initIntersectionObserver() {
    const elements = document.querySelectorAll('.project-card, .skill-category, #about p');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Hero section animation
function initHeroAnimation() {
    const heroItems = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroItems.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.animation = `fadeInUp 0.8s ease forwards ${i*0.2}s`;
    });
}

// Add keyframes dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp { to {opacity:1; transform:translateY(0);} }
    `;
    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    initMobileMenu();
    initScrollEffect();
    initSkillsAnimation();
    initContactForm();
    initIntersectionObserver();
    initHeroAnimation();
});
