console.log("覗いてますね？👀");
console.log("このウェブサイトはAntigravityで作りました。いやすごっ");

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

    // Dynamic Activity Loading
    const activitiesListGrid = document.getElementById('activities-list-grid');
    const activitiesFeaturedGrid = document.getElementById('activities-featured-grid');

    if (activitiesListGrid) {
        loadActivities(activitiesListGrid, false);
    }
    if (activitiesFeaturedGrid) {
        loadActivities(activitiesFeaturedGrid, true);
    }

});

/**
 * Loads activities from JSON and renders them into the container
 * @param {HTMLElement} container 
 * @param {boolean} filterFeatured - Whether to only show featured items
 */
async function loadActivities(container, filterFeatured = false) {
    const isSubDir = window.location.pathname.includes('/activities/');
    const jsonPath = isSubDir ? '../assets/data/activities.json' : 'assets/data/activities.json';
    const imagePrefix = isSubDir ? '../assets/images/activities/' : 'assets/images/activities/';
    const linkPrefix = isSubDir ? '' : 'activities/';

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Failed to fetch activities');
        const activities = await response.json();

        let displayActivities = activities;

        if (filterFeatured) {
            // Show only featured items
            displayActivities = activities.filter(activity => activity.featured);
        } else {
            // Sort by date descending for the full list
            displayActivities.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
        }

        if (displayActivities.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding: 2rem;">表示できる活動がありません。</p>';
            return;
        }

        container.innerHTML = displayActivities.map(activity => `
            <a href="${linkPrefix}${activity.link}" class="card activity-card" style="text-decoration: none; color: inherit; display: block;" data-date="${activity.rawDate}">
                <img src="${imagePrefix}${activity.image}" alt="${activity.title}" class="activity-image">
                <div class="activity-content">
                    <h3>${activity.title}</h3>
                    <div class="activity-date">${activity.date}</div>
                    <p>${activity.description}</p>
                    <div class="read-more">Read More <span>→</span></div>
                </div>
            </a>
        `).join('');

        // Apply fade-in animation to dynamic elements
        const newCards = container.querySelectorAll('.activity-card');
        newCards.forEach(card => {
            card.classList.add('fade-in');
            if (typeof observer !== 'undefined') {
                observer.observe(card);
            }
        });

    } catch (error) {
        console.error('Error loading activities:', error);
        container.innerHTML = '<p style="text-align:center; padding: 2rem;">活動情報の読み込みに失敗しました。</p>';
    }
}

// Loading Screen
const loading = document.getElementById('loading');
if (loading) {
    // Check if user has visited in this session
    const visited = sessionStorage.getItem('visited');

    if (visited) {
        // If visited, hide loading screen immediately without animation
        loading.classList.add('loaded');
    } else {
        // If first visit, wait for page load then show animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('loaded');
                // Mark as visited for this session
                sessionStorage.setItem('visited', 'true');
            }, 1000);
        });
    }
}
