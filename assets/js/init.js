/**
 * Main Initialization Module
 * Loads and initializes all app modules
 * Entry point for the application
 */

class AppInit {
    constructor() {
        this.init();
    }

    init() {
        // All modules are initialized automatically when they load
        // This file serves as the entry point and can be used for:
        // - Global configuration
        // - Feature detection
        // - Polyfills
        // - Error tracking setup
        
        console.log('Donut Terapia Web App initialized');
        this.logLoadedModules();
    }

    /**
     * Log which modules are loaded (for debugging)
     */
    logLoadedModules() {
        const modules = [];
        if (window.UICore) modules.push('UICore');
        if (window.shoppingCart) modules.push('ShoppingCart');
        if (window.animations) modules.push('Animations');
        if (window.policyAccordion) modules.push('PolicyAccordion');
        if (window.franchiseForm) modules.push('FranchiseForm');
        if (window.menuPage) modules.push('MenuPage');

        if (modules.length > 0) {
            console.log('Loaded modules:', modules.join(', '));
        }
        
        // Log cart state
        if (window.shoppingCart) {
            console.log('Cart items:', window.shoppingCart.getCartTotal());
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AppInit();
    });
} else {
    new AppInit();
}
