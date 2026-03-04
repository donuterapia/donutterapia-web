// Enhanced JavaScript for Donut Terapia Website
class DonutTerapiaWebsite {
    constructor() {
        this.cart = [];
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupCartFunctionality();
        this.setupOrderButtons();
        this.setupAnimations();
        this.setupNewsletterSubscription();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('animate-slideDown');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Close menu when clicking on a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu) mobileMenu.classList.add('hidden');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupCartFunctionality() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && button.textContent.includes('Agregar al Carrito')) {
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

    addToCart(name, price, button) {
        const donut = {
            name,
            price,
            id: Date.now(),
            quantity: 1
        };
        
        this.cart.push(donut);
        this.showCartNotification(name, button);
        this.updateCartBadge();
        
        // Save to localStorage
        localStorage.setItem('donutCart', JSON.stringify(this.cart));
    }

    showCartNotification(donutName, button) {
        // Visual feedback on button
        const originalText = button.textContent;
        const originalClasses = button.className;
        
        button.textContent = '¡Agregado! 🍩';
        button.classList.remove('bg-dt-blue-500', 'hover:bg-dt-blue-700');
        button.classList.add('bg-dt-glacing', 'hover:bg-red-600');
        
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-dt-glacing to-red-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">🍩</span>
                <div>
                    <div class="font-bold">¡Agregado al carrito!</div>
                    <div class="text-sm opacity-90">${donutName}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.className = originalClasses;
            notification.classList.add('animate-slideOutRight');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    updateCartBadge() {
        let badge = document.querySelector('.cart-badge');
        if (!badge) {
            // Create badge if it doesn't exist
            const orderButton = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ordenar Ahora'));
            if (orderButton) {
                badge = document.createElement('span');
                badge.className = 'cart-badge absolute -top-2 -right-2 bg-dt-glacing text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold';
                orderButton.parentElement.classList.add('relative');
                orderButton.parentElement.appendChild(badge);
            }
        }
        
        if (badge) {
            badge.textContent = this.cart.length;
            badge.classList.toggle('hidden', this.cart.length === 0);
        }
    }

    setupOrderButtons() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && (button.textContent.includes('Ordenar Ahora en Línea') || button.textContent.includes('Encuentra una Ubicación'))) {
                this.showOrderModal(button);
            }
        });
    }

    showOrderModal(button) {
        const isOrderOnline = button.textContent.includes('Ordenar Ahora en Línea');
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-gradient-to-br from-dt-donut to-dt-donut-shadow rounded-2xl p-8 max-w-md w-full animate-scaleIn">
                <div class="text-center">
                    <div class="text-6xl mb-4">🍩</div>
                    <h3 class="font-konigsberg text-3xl text-dt-letter-outline mb-4">${isOrderOnline ? '¿Listo para Ordenar?' : '¿Encuentra tu Ubicación?'}</h3>
                    <p class="text-dt-letter-outline mb-6">
                        ${isOrderOnline 
                            ? '¡Te redirigiremos a nuestro sistema de pedidos en línea donde puedes explorar nuestro menú completo!'
                            : '¡Encuentra la sucursal de Donut Terapia más cercana a ti!'}
                    </p>
                    <div class="flex space-x-4">
                        <button class="modal-cancel flex-1 bg-gray-300 text-gray-800 py-3 rounded-full font-bold hover:bg-gray-400 transition-colors">
                            Cancelar
                        </button>
                        <button class="modal-confirm flex-1 bg-dt-glacing text-white py-3 rounded-full font-bold hover:bg-red-600 transition-colors">
                            ¡Adelante!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for animations if not already added
        if (!document.getElementById('donut-animations')) {
            const style = document.createElement('style');
            style.id = 'donut-animations';
            style.textContent = `
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out;
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .animate-slideOutRight {
                    animation: slideOutRight 0.3s ease-out;
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                @keyframes fadeInUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Handle modal buttons
        modal.querySelector('.modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.modal-confirm').addEventListener('click', () => {
            if (isOrderOnline) {
                // Redirect to subscription/ordering page
                window.location.href = '/suscripcion/';
            } else {
                // Redirect to locations page
                window.location.href = '/stores/';
            }
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    setupAnimations() {
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe elements for animation
        document.querySelectorAll('section, .donut-hover, h2, h3, .bg-black').forEach(el => {
            observer.observe(el);
        });
    }

    setupNewsletterSubscription() {
        const form = document.querySelector('form[data-newsletter]');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]');
                
                if (email && email.value) {
                    // Store email or send to server
                    this.subscribeNewsletter(email.value);
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight';
                    successMsg.textContent = `✅ ¡Gracias por suscribirse, ${email.value}!`;
                    document.body.appendChild(successMsg);
                    
                    // Clear form
                    form.reset();
                    
                    // Remove message after 3 seconds
                    setTimeout(() => {
                        successMsg.classList.add('animate-slideOutRight');
                        setTimeout(() => successMsg.remove(), 300);
                    }, 3000);
                }
            });
        }
    }

    subscribeNewsletter(email) {
        // Save to localStorage as demo, or connect to actual API
        let subscribers = JSON.parse(localStorage.getItem('donutSubscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('donutSubscribers', JSON.stringify(subscribers));
        }
        console.log('📧 Suscriptor agregado:', email);
    }

    // Public method to get cart data
    getCart() {
        return this.cart;
    }

    // Public method to clear cart
    clearCart() {
        this.cart = [];
        localStorage.removeItem('donutCart');
        this.updateCartBadge();
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.donutTerapia = new DonutTerapiaWebsite();
    
    // Add a welcome message in console
    console.log(
        '%c🍩 ¡Bienvenido a Donut Terapia! %c\n¡Código fresco para donas frescas!', 
        'color: #ffcf64; font-size: 16px; font-weight: bold;',
        'color: #ea1947; font-size: 14px;'
    );
});

// Utility function for donut rating
function rateDonut(rating) {
    console.log(`⭐ Calificación enviada: ${rating} estrellas`);
    return rating;
}
