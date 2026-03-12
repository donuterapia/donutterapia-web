
// Mobile menu toggle
document.getElementById('mobileMenuButton')?.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('doughliciousCart')) || [];
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove('hidden');
        }
    }

    // Policy accordion functionality
    const policyQuestions = document.querySelectorAll('.policy-question');
    policyQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span:last-child');
            
            // Toggle current content
            content.classList.toggle('open');
            
            // Update icon
            if (content.classList.contains('open')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });

    // Smooth scrolling for policy navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu) mobileMenu.classList.add('hidden');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Order button functionality
    document.querySelectorAll('button:contains("Order Now")').forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'menu.html';
        });
    });

    // Print functionality enhancement
    window.addEventListener('beforeprint', function() {
        // Add print-specific styles
        const printStyle = document.createElement('style');
        printStyle.textContent = `
            @media print {
                header, footer, .policy-nav, .back-to-top, .print-button {
                    display: none !important;
                }
                body {
                    background: white !important;
                    color: black !important;
                }
                .policy-section {
                    page-break-inside: avoid;
                }
                .text-dt-yellow-400 {
                    color: #333 !important;
                }
                .text-dt-donut {
                    color: #5b3429 !important;
                }
            }
        `;
        document.head.appendChild(printStyle);
    });

    // Add animation delays
    const style = document.createElement('style');
    style.textContent = `
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Highlight current section in navigation
    const sections = document.querySelectorAll('.policy-section');
    const navLinks = document.querySelectorAll('.policy-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('bg-dt-glacing', 'text-white');
            link.classList.add(
                link.getAttribute('href') === '#privacy' ? 'bg-dt-glacing/20' :
                link.getAttribute('href') === '#terms' ? 'bg-dt-blue-900/30' :
                link.getAttribute('href') === '#refund' ? 'bg-dt-purple-900/30' :
                link.getAttribute('href') === '#shipping' ? 'bg-dt-yellow-900/30' :
                'bg-dt-glacing/20'
            );
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('bg-dt-glacing/20', 'bg-dt-blue-900/30', 'bg-dt-purple-900/30', 'bg-dt-yellow-900/30');
                link.classList.add('bg-dt-glacing', 'text-white');
            }
        });
    });
});

// Cookie preferences manager
function manageCookies() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-gradient-to-br from-dt-donut to-dt-donut-shadow rounded-2xl p-8 max-w-md w-full">
            <div class="text-center">
                <div class="text-4xl mb-4">🍪</div>
                <h3 class="font-konigsberg text-2xl text-dt-letter-outline mb-4">Cookie Preferences</h3>
                <p class="text-dt-letter-outline mb-6 text-sm">
                    Manage your cookie preferences below. Essential cookies cannot be disabled.
                </p>
                
                <div class="space-y-4 mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-dt-letter-outline font-bold">Essential Cookies</div>
                            <div class="text-dt-letter-outline/70 text-xs">Required for site functionality</div>
                        </div>
                        <div class="relative">
                            <div class="w-12 h-6 bg-gray-300 rounded-full"></div>
                            <div class="absolute top-1 left-1 w-4 h-4 bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-dt-letter-outline font-bold">Analytics Cookies</div>
                            <div class="text-dt-letter-outline/70 text-xs">Help us improve our website</div>
                        </div>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-dt-letter-outline font-bold">Marketing Cookies</div>
                            <div class="text-dt-letter-outline/70 text-xs">Personalized content & ads</div>
                        </div>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                
                <div class="flex space-x-4">
                    <button class="cookie-accept flex-1 bg-dt-glacing text-white py-3 rounded-full font-bold hover:bg-red-600 transition-colors">
                        Accept All
                    </button>
                    <button class="cookie-save flex-1 bg-dt-blue-500 text-white py-3 rounded-full font-bold hover:bg-dt-blue-700 transition-colors">
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add switch styles
    const switchStyle = document.createElement('style');
    switchStyle.textContent = `
        .switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        input:checked + .slider {
            background-color: #ea1947;
        }
        input:checked + .slider:before {
            transform: translateX(24px);
        }
        .slider.round {
            border-radius: 24px;
        }
        .slider.round:before {
            border-radius: 50%;
        }
    `;
    document.head.appendChild(switchStyle);
    
    // Handle modal buttons
    modal.querySelector('.cookie-accept').addEventListener('click', function() {
        localStorage.setItem('cookiePreferences', 'all');
        showNotification('Cookie preferences saved!');
        modal.remove();
        switchStyle.remove();
    });
    
    modal.querySelector('.cookie-save').addEventListener('click', function() {
        const analytics = modal.querySelector('input[type="checkbox"]:nth-of-type(1)').checked;
        const marketing = modal.querySelector('input[type="checkbox"]:nth-of-type(2)').checked;
        
        localStorage.setItem('cookiePreferences', JSON.stringify({
            analytics: analytics,
            marketing: marketing,
            date: new Date().toISOString()
        }));
        
        showNotification('Cookie preferences saved!');
        modal.remove();
        switchStyle.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            switchStyle.remove();
        }
    });
}

// Add cookie management button event
document.addEventListener('click', function(e) {
    if (e.target.closest('button')?.textContent.includes('Manage cookie preferences')) {
        manageCookies();
    }
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-dt-glacing to-pink-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideIn';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <span class="text-2xl">✅</span>
            <div class="font-bold">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation styles
    const style = document.createElement('style');
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('animate-slideIn');
        notification.classList.add('animate-slideOut');
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}