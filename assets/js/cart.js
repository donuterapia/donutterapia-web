/**
 * Shopping Cart Module
 * Handles: Cart persistence, CRUD operations, header button display
 */

class ShoppingCart {
    constructor() {
        this.cart = [];
        this.localStorageKey = 'donutCart';
        this.loadCart();
        this.init();
    }

    init() {
        this.updateCartDisplay();
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
     * Add item to cart
     */
    addToCart(name, price, button = null) {
        // Check if item already exists
        const existingItem = this.cart.find(item => item.name === name && item.price === price);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name,
                price,
                id: Date.now(),
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${name} agregado al carrito! 🍩`);
    }

    /**
     * Remove item from cart by ID
     */
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    }

    /**
     * Update quantity of item in cart
     */
    updateQuantity(itemId, quantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(itemId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    /**
     * Clear all items from cart
     */
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
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
     * Update header button display and navigate to cart page when clicked
     */
    updateCartDisplay() {
        const total = this.getCartTotal();
        
        // Update "Ordenar Ahora" button in header and add click handler
        const orderButtons = document.querySelectorAll('[data-cart-button]');
        orderButtons.forEach(btn => {
            // Update button text with cart count
            if (total > 0) {
                btn.textContent = `Ordenar Ahora (${total})`;
            } else {
                btn.textContent = 'Ordenar Ahora';
            }
        });
    }

    /**
     * Get cart items
     */
    getCart() {
        return this.cart;
    }

    /**
     * Show notification when item is added to cart
     */
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-dt-glacing to-pink-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideIn';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">🍩</span>
                <div class="font-bold">${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add animation styles if not already present
        if (!document.getElementById('toast-animations')) {
            const style = document.createElement('style');
            style.id = 'toast-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
                .animate-slideOut {
                    animation: slideOut 0.3s ease-in;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('animate-slideIn');
            notification.classList.add('animate-slideOut');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
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
