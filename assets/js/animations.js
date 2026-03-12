/**
 * Animations Module
 * Groups visual effects by action type:
 * - Element animations (counters, floating elements)
 * - Page-specific animations
 * - Interactive animations
 */

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.setupFloatingElements();
        this.setupCounterAnimations();
        this.setupCarouselAnimations();
    }

    /**
     * FLOATING ELEMENTS - Used on multiple pages
     * Creates smooth floating/bobbing animation
     */
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${3 + index}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    /**
     * COUNTER ANIMATIONS - Used on franchise page
     * Animates numbers counting up to target value
     */
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.count');
        if (counters.length === 0) return;

        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                    counter.classList.add('count-up');
                }
            };

            updateCount();
        });
    }

    /**
     * CAROUSEL ANIMATIONS - Used on locations page
     * Smooth scrolling carousel with buttons
     */
    setupCarouselAnimations() {
        const carousel = document.getElementById('storesCarousel');
        if (!carousel) return;

        const scrollPrevBtn = document.getElementById('scrollPrev');
        const scrollNextBtn = document.getElementById('scrollNext');

        if (!scrollPrevBtn || !scrollNextBtn) return;

        const scrollAmount = 420; // Card width + gap

        scrollPrevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollNextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    /**
     * SCALE IN ANIMATION - For modals and popups
     */
    setupScaleInAnimation() {
        // CSS class: animate-scaleIn
        // Applied to modal elements
    }

    /**
     * SLIDE DOWN ANIMATION - For menu
     */
    setupSlideDownAnimation() {
        // CSS class: animate-slideDown
        // Applied to mobile menu on toggle
    }

    /**
     * Trigger custom animation on element
     */
    triggerAnimation(element, animationName, duration = 500) {
        element.style.animation = `${animationName} ${duration}ms ease-in-out`;
        
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.animations = new Animations();
    });
} else {
    window.animations = new Animations();
}
