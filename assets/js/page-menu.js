/**
 * Menu Page Module
 * Handles: Menu rendering, filtering, and cart integration
 * Uses products from Jekyll data file (window.allProducts)
 */

class MenuPage {
    constructor() {
        // Use Jekyll products data if available, otherwise fallback to hardcoded data
        this.donutMenu = window.allProducts && window.allProducts.length > 0 
            ? window.allProducts 
            : this.getHardcodedMenu();

        this.currentFilter = 'all';
        this.visibleDonuts = 6;
        this.colorMap = {
            yellow: 'from-dt-yellow-400 to-dt-yellow-700',
            red: 'from-dt-glacing to-pink-600',
            brown: 'from-dt-letter-outline to-yellow-800',
            amber: 'from-yellow-600 to-orange-600',
            purple: 'from-dt-purple-400 to-dt-purple-700',
            white: 'from-gray-200 to-gray-400',
            green: 'from-green-400 to-green-600',
            black: 'from-gray-800 to-black',
            orange: 'from-orange-400 to-orange-600',
            blue: 'from-dt-blue-400 to-dt-blue-700'
        };
        
        this.categoryBgMap = {
            classic: 'bg-dt-yellow-200',
            filled: 'bg-dt-purple-200',
            specialty: 'bg-dt-blue-200',
            seasonal: 'bg-dt-glacing/20',
            vegan: 'bg-green-200',
            promociones: 'bg-dt-glacing/20',
            personalizadas: 'bg-dt-purple-200',
            docenas: 'bg-dt-yellow-200',
            combos: 'bg-dt-blue-200',
            'media-docena': 'bg-yellow-100',
            'pa-tres': 'bg-yellow-50',
            bebidas: 'bg-blue-200',
            mercaderia: 'bg-gray-200'
        };

        this.categoryNameMap = {
            classic: 'Clásica',
            filled: 'Rellena',
            specialty: 'Especial',
            seasonal: 'Temporada',
            vegan: 'Vegana',
            promociones: 'Promoción',
            personalizadas: 'Personalizada',
            docenas: 'Docena',
            combos: 'Combo',
            'media-docena': 'Media Docena',
            'pa-tres': 'Pa Tres',
            bebidas: 'Bebida',
            mercaderia: 'Mercadería'
        };

        this.init();
    }

    /**
     * Fallback hardcoded menu data (used if Jekyll data not available)
     */
    getHardcodedMenu() {
        return [
            // Classic Glazed
            { id: 1, name: "Glasa Clásica", description: "Nuestra dona con glasa de vainilla", price: 3.50, category: "classic", bestseller: true, color: "yellow" },
            { id: 2, name: "Glasa de Chocolate", description: "Glasa de chocolate rica sobre masa suave", price: 4.00, category: "classic", bestseller: true, color: "brown" },
            { id: 3, name: "Tocino y Maple", description: "Glasa de maple con trocitos de tocino crujiente", price: 4.75, category: "classic", bestseller: false, color: "amber" },
            { id: 4, name: "Canela y Azúcar", description: "Recién hecha con canela y azúcar", price: 3.75, category: "classic", bestseller: false, color: "brown" },
            
            // Filled Donuts
            { id: 5, name: "Crema Boston", description: "Rellena de crema de vainilla, glasa de chocolate", price: 4.25, category: "filled", bestseller: true, color: "yellow" },
            { id: 6, name: "Jalea de Frambuesa", description: "Rellena de dulce jalea de frambuesa", price: 4.00, category: "filled", bestseller: false, color: "red" },
            { id: 7, name: "Cuajada de Limón", description: "Cuajada de limón con azúcar glas", price: 4.50, category: "filled", bestseller: false, color: "yellow" },
            { id: 8, name: "Queso Crema", description: "Rellena de queso crema rico", price: 4.25, category: "filled", bestseller: false, color: "white" },
            
            // Specialty
            { id: 9, name: "Terciopelo Rojo", description: "Dona de terciopelo rojo con glasa de queso crema", price: 4.75, category: "specialty", bestseller: true, color: "red" },
            { id: 10, name: "Té Matcha", description: "Glasa premium de matcha con chocolate blanco", price: 5.00, category: "specialty", bestseller: false, color: "green" },
            { id: 11, name: "Caramelo Salado", description: "Caramelo mantequilla con escamas de sal marina", price: 4.75, category: "specialty", bestseller: true, color: "amber" },
            { id: 12, name: "Cookies & Cream", description: "Galletas Oreo molidas con glasa de vainilla", price: 4.50, category: "specialty", bestseller: false, color: "black" },
            
            // Seasonal
            { id: 13, name: "Especias de Calabaza", description: "Favorita de temporada con glasa de calabaza", price: 4.75, category: "seasonal", bestseller: true, color: "orange" },
            { id: 14, name: "Menta Mocha", description: "Glasa chocolate-menta con bastón de caramelo", price: 4.50, category: "seasonal", bestseller: false, color: "red" },
            { id: 15, name: "Sidra de Manzana", description: "Glasa tibia de sidra con canela", price: 4.25, category: "seasonal", bestseller: false, color: "brown" },
            
            // Vegan Options
            { id: 16, name: "Vegana Clásica", description: "Versión vegana de nuestro clásico", price: 4.25, category: "vegan", bestseller: true, color: "yellow" },
            { id: 17, name: "Vegana Chocolate", description: "Glasa de chocolate sin productos lácteos", price: 4.50, category: "vegan", bestseller: false, color: "brown" },
            { id: 18, name: "Vegana de Fruta", description: "Glasa de fruta mixta, amigable con veganos", price: 4.75, category: "vegan", bestseller: false, color: "purple" },
        ];
    }

    init() {
        // Check if menu grid exists (only init if on menu page)
        if (document.getElementById('donutGrid')) {
            this.renderDonutGrid();
            this.setupFilterListeners();
            this.setupAddToCartListeners();
        }
    }

    /**
     * Get color for product based on its color property or category
     */
    getProductColor(product) {
        // If product has color property, use it
        if (product.color) {
            return product.color;
        }
        
        // Otherwise, assign based on category
        const categoryColorMap = {
            classic: 'yellow',
            filled: 'red',
            specialty: 'purple',
            seasonal: 'orange',
            vegan: 'green',
            promociones: 'red',
            personalizadas: 'purple',
            docenas: 'yellow',
            combos: 'amber',
            'media-docena': 'yellow',
            'pa-tres': 'brown',
            bebidas: 'blue',
            mercaderia: 'brown'
        };
        
        return categoryColorMap[product.category] || 'yellow';
    }

    /**
     * Render the donut menu grid
     */
    renderDonutGrid() {
        const grid = document.getElementById('donutGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredDonuts = this.donutMenu.filter(donut => {
            if (this.currentFilter === 'all') return true;
            return donut.category === this.currentFilter;
        }).slice(0, this.visibleDonuts);
        
        filteredDonuts.forEach(donut => {
            const card = document.createElement('div');
            card.className = 'bg-black rounded-2xl p-6 shadow-2xl donut-hover relative';
            card.dataset.category = donut.category;
            
            // Get color for product (either from property or category mapping)
            const productColor = this.getProductColor(donut);
            const gradientClass = this.colorMap[productColor] || 'from-dt-donut to-dt-donut-shadow';
            const bgClass = this.categoryBgMap[donut.category] || 'bg-dt-yellow-200';
            
            card.innerHTML = `
                ${donut.bestseller ? '<span class="category-badge bg-dt-glacing text-white">⭐ Favorita</span>' : ''}
                <div class="h-48 rounded-xl mb-4 flex items-center justify-center ${bgClass}">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br ${gradientClass} relative donut-spin">
                        <div class="absolute top-4 w-24 h-24 rounded-full bg-white/20 left-1/2 transform -translate-x-1/2"></div>
                        <div class="absolute top-8 w-16 h-16 rounded-full bg-white/40 left-1/2 transform -translate-x-1/2"></div>
                        <div class="absolute top-12 w-8 h-8 rounded-full bg-white/60 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                </div>
                <h4 class="font-konigsberg text-2xl text-dt-donut mb-2">${donut.name}</h4>
                <p class="text-dt-yellow-400 text-sm mb-4">${donut.description}</p>
                <div class="flex justify-between items-center">
                    <div>
                        <span class="font-bold text-dt-glacing text-xl">$${donut.price.toFixed(2)}</span>
                        <span class="text-dt-yellow-400 text-sm ml-2">${this.categoryNameMap[donut.category] || donut.category}</span>
                    </div>
                    <button class="add-menu-item bg-dt-blue-500 text-white px-6 py-2 rounded-full hover:bg-dt-blue-700 transition-colors" 
                            data-id="${donut.id}" 
                            data-name="${donut.name}" 
                            data-price="${donut.price}">
                        Agregar
                    </button>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        // Update load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            const totalFiltered = this.donutMenu.filter(donut => {
                if (this.currentFilter === 'all') return true;
                return donut.category === this.currentFilter;
            }).length;
            
            loadMoreBtn.style.display = this.visibleDonuts >= totalFiltered ? 'none' : 'block';
        }
    }

    /**
     * Setup filter button listeners
     */
    setupFilterListeners() {
        document.querySelectorAll('.filter-item').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active from all
                document.querySelectorAll('.filter-item').forEach(btn => {
                    btn.classList.remove('active', 'bg-dt-glacing');
                    btn.classList.add('text-opacity-60');
                });
                
                // Add active to clicked
                button.classList.add('active', 'bg-dt-glacing');
                button.classList.remove('text-opacity-60');
                
                // Update filter and render
                this.currentFilter = button.dataset.filter;
                this.visibleDonuts = 6;
                this.renderDonutGrid();
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.visibleDonuts += 6;
                this.renderDonutGrid();
            });
        }
    }

    /**
     * Setup "Agregar" button listeners to add to cart
     */
    setupAddToCartListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-menu-item')) {
                const button = e.target;
                const name = button.dataset.name;
                const price = parseFloat(button.dataset.price);
                
                // Use the global shopping cart
                if (window.shoppingCart) {
                    window.shoppingCart.addToCart(name, price, button);
                }
            }
        });
    }
}

// Initialize if on menu page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('donutGrid')) {
            window.menuPage = new MenuPage();
        }
    });
} else {
    if (document.getElementById('donutGrid')) {
        window.menuPage = new MenuPage();
    }
}
