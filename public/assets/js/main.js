/**
 * 東大ドラえもんF同好会 - メインスクリプト
 *
 * 【主な機能】
 * 1. 活動内容の動的読み込み (JSON連携)
 * 2. 活動詳細ページでのフォトギャラリー自動生成
 * 3. 共通パーツ（ヘッダー・フッター・ナビゲーション）の制御
 * 4. ライトボックス機能（画像表示・拡大）
 *
 * メンテナー向け：
 * - 活動を追加・編集する場合は assets/data/activities.json を編集してください。
 * - ページごとのギャラリーは、HTML内の #activity-gallery 要素を基準に、
 *   現在のファイル名と JSON 内の "link" プロパティを照合して自動生成されます。
 */

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

    /* 
       Astro移行に伴い、データの読み込みはビルド時に行われるようになったため、
       以下の動的読み込み処理は停止しています。
    if (activitiesListGrid) {
        loadActivities(activitiesListGrid, false);
    }
    if (activitiesFeaturedGrid) {
        loadActivities(activitiesFeaturedGrid, true);
    }
    */

    // Scroll Direction Header Control
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    const hideThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Do not hide if mobile menu is open
        const isMenuOpen = hamburger && hamburger.classList.contains('active');

        if (!isMenuOpen) {
            if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
        }
        lastScrollY = currentScrollY;
    }, { passive: true });

});

/**
 * Astro移行に伴い、データの読み込みはビルド時（src/pages/index.astro）に
 * 行われるようになったため、以下のJavaScriptによる動的読み込みは不要になりました。
 */
/*
async function loadActivities(container, filterFeatured = false) {
    // 処理は現在Astro側で完結しています
}
*/

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

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Activity Gallery Loading for individual pages
    /*
    Astro移行に伴い、ギャラリーはビルド時に生成されるようになったため、
    以下の動的読み込み処理は停止しています。
    const activityGallery = document.getElementById('activity-gallery');
    if (activityGallery) {
        initActivityGallery(activityGallery);
    }
    */

    // Lightbox Functionality - Initial call
    setupLightbox();
});

/**
 * Astro移行に伴い、ギャラリーの生成はビルド時（src/pages/activities/[slug].astro）に
 * 行われるようになったため、以下のJavaScriptによる動的読み込みは不要になりました。
 */
/*
async function initActivityGallery(container) {
    // 処理は現在Astro側で完結しています
}
*/

/**
 * Sets up the lightbox click event listeners
 */
function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Remove existing listeners if any (simple way: clone and replace nodes, but here we just add)
    galleryItems.forEach(img => {
        // Prevent double binding if called multiple times
        if (img.dataset.lightboxInit) return;
        img.dataset.lightboxInit = "true";

        img.addEventListener('click', (e) => {
            const src = e.target.getAttribute('src');
            const alt = e.target.getAttribute('alt');

            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            lightbox.innerHTML = `
                <div class="lightbox-close">&times;</div>
                <img src="${src}" alt="${alt}">
            `;

            document.body.appendChild(lightbox);

            // Trigger animation
            setTimeout(() => lightbox.classList.add('active'), 10);

            // Close lightbox
            const closeLightbox = () => {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.remove(), 300);
            };

            lightbox.addEventListener('click', closeLightbox);
        });
    });
}

// Note: setupLightbox is called both on DOMContentLoaded and after dynamic gallery loading.
