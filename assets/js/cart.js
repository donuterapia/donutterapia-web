/**
 * Shopping Cart Module
 * Handles: Add to cart, cart notifications, cart persistence
 */

class ShoppingCart {
    constructor() {
        this.cart = [];
        this.localStorageKey = 'donutCart';
        this.loadCart();
        this.init();
    }

    init() {
        this.setupCartButtons();
        this.updateCartBadge();
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        const saved = localStorage.getItem(this.localStorageKey);
        this.cart = saved ? JSON.parse(saved) : [];
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart));
    }

    /**
     * Setup event listeners for "Add to Cart" buttons
     */
    setupCartButtons() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && button.textContent.includes('Agregar al Carrito')) {
                e.preventDefault();
                
                const card = button.closest('.bg-black');
                if (card) {
                    const donutName = card.querySelector('h4')?.textContent || 'Dona';
                    const priceText = card.querySelector('.text-dt-glacing')?.textContent || '$4.00';
                    const price = parseFloat(priceText.replace('$', ''));

                    this.addToCart(donutName, price, button);
                }
            }
        });
    }

    /**
     * Add item to cart
     */
    addToCart(name, price, button) {
        const donut = {
            name,
            price,
            id: Date.now(),
            quantity: 1
        };

        this.cart.push(donut);
        this.saveCart();
        this.showCartNotification(name, button);
        this.updateCartBadge();
    }

    /**
     * Remove item from cart by ID
     */
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartBadge();
    }

    /**
     * Clear all items from cart
     */
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartBadge();
    }

    /**
     * Get total items in cart
     */
    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Get total price
     */
    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Show visual feedback notification
     */
    showCartNotification(donutName, button) {
        const originalText = button.textContent;
        const originalBg = button.className;

        button.textContent = '✅ Agregado!';
        button.classList.add('bg-green-500');
        button.classList.remove('bg-dt-pink');
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.className = originalBg;
            button.disabled = false;
        }, 2000);
    }

    /**
     * Update cart badge count
     */
    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (!badge) return;

        const total = this.getCartTotal();
        if (total > 0) {
            badge.textContent = total;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    /**
     * Get cart items
     */
    getCart() {
        return this.cart;
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.shoppingCart = new ShoppingCart();
    });
} else {
    window.shoppingCart = new ShoppingCart();
}
