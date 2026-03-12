/**
 * Cart Page Manager
 * Handles: Cart rendering, checkout, promo codes, suggested items
 */

class CartManager {
    constructor() {
        this.taxRate = 0.08; // 8% tax
        this.deliveryFee = 3.99;
        this.expressDeliveryUpcharge = 2.99;
        this.appliedPromo = null;
        this.promoCodes = {
            'DONA10': 0.10,      // 10% off
            'DELICIA15': 0.15,   // 15% off
            'PRIMERA25': 0.25    // 25% off first order
        };
        
        this.init();
    }
    
    init() {
        // Wait for shopping cart to be loaded
        const checkCart = setInterval(() => {
            if (window.shoppingCart && window.allProducts) {
                clearInterval(checkCart);
                this.renderCart();
                this.setupEventListeners();
                this.loadSuggestedItems();
                this.updateUI();
            }
        }, 100);
    }
    
    renderCart() {
        const container = document.getElementById('cartItemsContainer');
        const emptyCart = document.getElementById('emptyCart');
        const continueShopping = document.getElementById('continueShopping');
        const cart = window.shoppingCart.getCart();
        
        if (cart.length === 0) {
            container.innerHTML = '';
            emptyCart.classList.remove('hidden');
            continueShopping.classList.add('hidden');
            this.updateSummary();
            return;
        }
        
        emptyCart.classList.add('hidden');
        continueShopping.classList.remove('hidden');
        container.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item bg-black/30 rounded-2xl p-6 animate-slideIn';
            cartItem.style.animationDelay = `${index * 0.1}s`;
            
            cartItem.innerHTML = `
                <div class="flex flex-col md:flex-row md:items-center">
                    <div class="flex items-center mb-4 md:mb-0 md:w-2/3">
                        <div class="relative">
                            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-dt-donut to-dt-donut-shadow flex items-center justify-center mr-4">
                                <div class="text-2xl">🍩</div>
                            </div>
                            <span class="absolute -top-2 -right-2 bg-dt-glacing text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                ${item.quantity}
                            </span>
                        </div>
                        <div>
                            <h4 class="font-konigsberg text-xl text-dt-donut">${item.name}</h4>
                            <p class="text-dt-yellow-400 text-sm">$${item.price.toFixed(2)} c/u</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between md:w-1/3">
                        <div class="flex items-center space-x-2">
                            <button class="quantity-btn w-8 h-8 rounded-full bg-dt-blue-900/30 text-dt-blue-400 flex items-center justify-center hover:bg-dt-blue-500" data-index="${index}" data-action="decrease">
                                −
                            </button>
                            <span class="text-dt-yellow-400 font-bold w-8 text-center">${item.quantity}</span>
                            <button class="quantity-btn w-8 h-8 rounded-full bg-dt-blue-900/30 text-dt-blue-400 flex items-center justify-center hover:bg-dt-blue-500" data-index="${index}" data-action="increase">
                                +
                            </button>
                        </div>
                        
                        <div class="text-right">
                            <div class="text-dt-yellow-400 font-bold text-xl">
                                $${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button class="text-dt-glacing text-sm hover:text-red-500 transition-colors mt-1 remove-item" data-index="${index}">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(cartItem);
        });
        
        this.updateSummary();
    }
    
    updateSummary() {
        const cart = window.shoppingCart.getCart();
        const subtotal = window.shoppingCart.getTotalPrice();
        let deliveryFee = this.deliveryFee;
        
        // Check if express delivery is selected
        const expressDelivery = document.querySelector('input[name="delivery"]:checked');
        if (expressDelivery && expressDelivery.value === 'express') {
            deliveryFee += this.expressDeliveryUpcharge;
        } else if (expressDelivery && expressDelivery.value === 'pickup') {
            deliveryFee = 0;
        }
        
        const tax = subtotal * this.taxRate;
        let total = subtotal + deliveryFee + tax;
        
        // Apply promo code discount if any
        if (this.appliedPromo) {
            const discount = subtotal * this.appliedPromo.discount;
            total -= discount;
        }
        
        // Update DOM elements
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        
        // Update cart total items
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartTotalItems').textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        
        // Enable/disable checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.disabled = cart.length === 0;
    }
    
    setupEventListeners() {
        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn')) {
                const button = e.target.closest('.quantity-btn');
                const index = parseInt(button.dataset.index);
                const action = button.dataset.action;
                
                if (action === 'increase') {
                    const cart = window.shoppingCart.getCart();
                    window.shoppingCart.updateQuantity(cart[index].id, cart[index].quantity + 1);
                } else if (action === 'decrease') {
                    const cart = window.shoppingCart.getCart();
                    const newQty = cart[index].quantity - 1;
                    if (newQty <= 0) {
                        window.shoppingCart.removeFromCart(cart[index].id);
                    } else {
                        window.shoppingCart.updateQuantity(cart[index].id, newQty);
                    }
                }
                
                this.renderCart();
            }
            
            // Remove item
            if (e.target.closest('.remove-item')) {
                const button = e.target.closest('.remove-item');
                const index = parseInt(button.dataset.index);
                const cart = window.shoppingCart.getCart();
                window.shoppingCart.removeFromCart(cart[index].id);
                this.showNotification(`${cart[index].name} eliminada del carrito`);
                this.renderCart();
            }
            
            // Add suggested item
            if (e.target.closest('.add-suggested-item')) {
                const button = e.target.closest('.add-suggested-item');
                const name = button.dataset.name;
                const price = parseFloat(button.dataset.price);
                
                window.shoppingCart.addToCart(name, price, button);
                this.showNotification(`¡${name} agregada al carrito!`);
                this.renderCart();
            }
        });
        
        // Delivery option change
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateSummary();
            });
        });
        
        // Promo code
        const applyPromoBtn = document.getElementById('applyPromo');
        const promoInput = document.getElementById('promoCode');
        const promoMessage = document.getElementById('promoMessage');
        
        applyPromoBtn.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            
            if (this.promoCodes[code]) {
                this.appliedPromo = {
                    code: code,
                    discount: this.promoCodes[code]
                };
                
                promoMessage.textContent = `¡Código "${code}" aplicado! Descuento de ${this.promoCodes[code] * 100}%.`;
                promoMessage.className = 'text-xs text-green-400';
                promoMessage.classList.remove('hidden');
                
                // Animate the total
                document.getElementById('total').classList.add('animate-pulse');
                setTimeout(() => {
                    document.getElementById('total').classList.remove('animate-pulse');
                }, 500);
            } else {
                promoMessage.textContent = 'Código promocional inválido';
                promoMessage.className = 'text-xs text-dt-glacing';
                promoMessage.classList.remove('hidden');
                this.appliedPromo = null;
            }
            
            this.updateSummary();
        });
        
        // Enter key for promo code
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyPromoBtn.click();
            }
        });
        
        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.processCheckout();
        });
    }
    
    loadSuggestedItems() {
        const container = document.getElementById('suggestedItemsContainer');
        const cart = window.shoppingCart.getCart();
        
        // Get random products not in cart
        let suggestions = window.allProducts
            .filter(p => !cart.some(item => item.name === p.name))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        container.innerHTML = '';
        
        suggestions.forEach(product => {
            const item = document.createElement('div');
            item.className = 'bg-black rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow';
            
            item.innerHTML = `
                <div class="h-48 rounded-xl mb-4 flex items-center justify-center bg-gray-200 overflow-hidden">
                    ${product.image 
                        ? `<img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover">` 
                        : `<div class="w-32 h-32 rounded-full bg-gradient-to-br from-dt-donut to-dt-donut-shadow flex items-center justify-center text-4xl">🍩</div>`
                    }
                </div>
                <h4 class="font-konigsberg text-xl text-dt-donut mb-2">${product.name}</h4>
                <p class="text-dt-yellow-400 text-sm mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <div class="text-dt-glacing font-bold text-lg">$${product.price.toFixed(2)}</div>
                    <button class="bg-dt-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-dt-blue-700 transition-colors add-suggested-item" data-name="${product.name}" data-price="${product.price}">
                        Agregar
                    </button>
                </div>
            `;
            
            container.appendChild(item);
        });
    }
    
    processCheckout() {
        const cart = window.shoppingCart.getCart();
        
        if (cart.length === 0) return;
        
        // Build WhatsApp message with cart items
        let message = '*HOLA! QUIERO HACER UN PEDIDO DE DONAS*\n\n';
        
        // Add cart items
        message += 'ITEMS SOLICITADOS:\n';
        message += '─────────────────\n';
        cart.forEach(item => {
            message += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        // Add pricing summary
        const subtotal = window.shoppingCart.getTotalPrice();
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        const deliveryValue = deliveryOption ? deliveryOption.value : 'standard';
        
        let deliveryFee = this.deliveryFee;
        let deliveryText = 'Envío Estándar (30-60 min)';
        
        if (deliveryValue === 'express') {
            deliveryFee += this.expressDeliveryUpcharge;
            deliveryText = 'Envío Expresó (15-30 min)';
        } else if (deliveryValue === 'pickup') {
            deliveryFee = 0;
            deliveryText = 'Retirar en Tienda';
        }
        
        const tax = subtotal * this.taxRate;
        let total = subtotal + deliveryFee + tax;
        
        // Apply promo code discount if any
        if (this.appliedPromo) {
            const discount = subtotal * this.appliedPromo.discount;
            total -= discount;
            message += `\nCODIGO PROMOCIONAL: ${this.appliedPromo.code}\n`;
            message += `Descuento: -$${discount.toFixed(2)}\n`;
        }
        
        message += '\n═════════════════\n';
        message += 'RESUMEN DEL PEDIDO:\n';
        message += '═════════════════\n';
        message += `Subtotal: $${subtotal.toFixed(2)}\n`;
        message += `Opcion de entrega: ${deliveryText}\n`;
        message += `Costo de envio: $${deliveryFee.toFixed(2)}\n`;
        message += `Impuestos (8%): $${tax.toFixed(2)}\n`;
        message += `\n*TOTAL A PAGAR: $${total.toFixed(2)}*\n`;
        message += '\nPor favor confirma este pedido para continuar.';
        
        // WhatsApp number (Ecuador format)
        const phoneNumber = '593991412403';
        
        // Create WhatsApp link
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Show notification
        this.showNotification('Redirigiendo a WhatsApp...');
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            // Clear cart after opening WhatsApp
            setTimeout(() => {
                window.shoppingCart.clearCart();
                this.renderCart();
                this.showNotification('Carrito vaciado. Gracias por tu pedido!');
            }, 500);
        }, 500);
    }
    
    updateUI() {
        this.updateSummary();
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-dt-glacing to-pink-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">🍩</span>
                <div class="font-bold">${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('animate-slideInRight');
            notification.classList.add('animate-slideOutRight');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize cart when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cartManager = new CartManager();
    });
} else {
    window.cartManager = new CartManager();
}
