// Mobile Navigation Logic
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.querySelector('.sidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleMobileMenu() {
    sidebar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking a link
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Scroll Progress Logic
const progressBar = document.getElementById('progressBar');
// Revert to window scroll listener
window.addEventListener('scroll', () => {
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Sidebar Link Highlighting & Section Reveal on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.sidebar-link');

const observerOptions = {
    // Revert root to viewport
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Highlight nav link
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    revealObserver.observe(section);
});

// Typewriter Effect
const textElement = document.getElementById('typewriter');
const phrases = ['CS Student', 'Aspiring Software Engineer', 'Quick Learner', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler (Standard Submission for Reliability)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        const btn = contactForm.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    });
}
