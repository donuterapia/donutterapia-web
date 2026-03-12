/**
 * UI Core Module - Main UI interactions
 * Handles: Mobile menu, smooth scrolling, back-to-top button
 */

class UICore {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobileMenuButton');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.backToTop = document.getElementById('backToTop');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupBackToTopButton();
    }

    /**
     * Mobile menu toggle and closing behavior
     */
    setupMobileMenu() {
        if (!this.mobileMenuButton || !this.mobileMenu) return;

        // Toggle menu on button click
        this.mobileMenuButton.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
            this.mobileMenu.classList.toggle('animate-slideDown');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenuButton.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                this.mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when clicking on a link
        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.add('hidden');
            });
        });
    }

    /**
     * Smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (this.mobileMenu) {
                        this.mobileMenu.classList.add('hidden');
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Back-to-top button functionality
     */
    setupBackToTopButton() {
        if (!this.backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        });

        this.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new UICore();
    });
} else {
    new UICore();
}
