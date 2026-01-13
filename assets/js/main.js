console.log("覗いてますね？👀");
console.log("このウェブサイトはAIで作りました。いやすごっ");

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.card, .timeline-item, .hero-content');

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth Scroll for navigation links
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
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu function
    const closeMenu = (e) => {
        if (hamburger.classList.contains('active') &&
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    };

    // Close menu when clicking outside (Desktop/Mobile)
    document.addEventListener('click', closeMenu);

    // Close menu on touch (Mobile instant)
    document.addEventListener('touchstart', closeMenu);

    // Automatic Activity Sorting
    const sortActivities = () => {
        const activitiesList = document.querySelector('#activities-list .grid');
        if (activitiesList) {
            const items = Array.from(activitiesList.querySelectorAll('.activity-card'));

            items.sort((a, b) => {
                const dateA = new Date(a.dataset.date || '1970-01-01');
                const dateB = new Date(b.dataset.date || '1970-01-01');
                return dateB - dateA; // Descending (Newest first)
            });

            // Re-append items in sorted order
            items.forEach(item => activitiesList.appendChild(item));
        }
    };

    sortActivities();

    // Activities & Reports "Show More" Logic removed as we moved to a separate page.
});
