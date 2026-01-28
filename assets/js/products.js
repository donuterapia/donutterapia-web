// Products Database
const products = [
    // PROMOCIONES
    {
        id: 1,
        name: "Promo Quincena - 1 Docena Avellana",
        category: "promociones",
        price: 11.99,
        original_price: 12.30,
        description: "1 docena donuts de avellana o nutela",
        discount: 3,
        emoji: "🍩"
    },
    {
        id: 2,
        name: "Promo - 3 Berlines",
        category: "promociones",
        price: 2.99,
        original_price: 3.30,
        description: "3 berlines con relleno de tu elección",
        discount: 9,
        emoji: "🍩"
    },
    {
        id: 3,
        name: "Promo - Sábados y Domingos",
        category: "promociones",
        price: 12.99,
        original_price: 15.99,
        description: "1 docena donuts + 3 GRATIS. Fin de semana",
        discount: 19,
        emoji: "🍩"
    },

    // PERSONALIZADAS
    {
        id: 4,
        name: "12 Minis Mensaje",
        category: "personalizadas",
        price: 15.00,
        description: "12 mini donuts con mensaje personalizado",
        emoji: "💌"
    },
    {
        id: 5,
        name: "3 Donuts 1 Personalizada",
        category: "personalizadas",
        price: 9.97,
        description: "1 personalizada con relleno + 2 anillos",
        emoji: "✨"
    },
    {
        id: 6,
        name: "6 Donuts 1 Personalizada",
        category: "personalizadas",
        price: 15.99,
        description: "1 personalizada con relleno + 5 anillos",
        emoji: "🎨"
    },
    {
        id: 7,
        name: "6 Donuts Mensaje",
        category: "personalizadas",
        price: 12.50,
        original_price: 14.99,
        description: "Caja 6 donuts con relleno y mensaje escrito",
        discount: 17,
        emoji: "💝"
    },
    {
        id: 8,
        name: "Mega Donut",
        category: "personalizadas",
        price: 19.99,
        description: "1 donut gigante para 14 personas aprox",
        emoji: "🏆"
    },
    {
        id: 9,
        name: "Mood Donut",
        category: "personalizadas",
        price: 3.50,
        original_price: 4.50,
        description: "Donut con mensaje y dibujito personalizado",
        discount: 22,
        emoji: "😊"
    },
    {
        id: 10,
        name: "Ramo Donuts - 6 Minis + 3 Flores",
        category: "personalizadas",
        price: 14.00,
        description: "Ramo personalizado perfecto para regalo",
        emoji: "🌹"
    },
    {
        id: 11,
        name: "Mega Mood",
        category: "personalizadas",
        price: 19.99,
        description: "Mega donut personalizada",
        emoji: "👑"
    },

    // DOCENAS
    {
        id: 12,
        name: "2 Docenas Mini Donitas",
        category: "docenas",
        price: 18.00,
        description: "2 docenas de mini donita 7cm de tamaño",
        emoji: "🍩"
    },
    {
        id: 13,
        name: "Docena Donuts",
        category: "docenas",
        price: 12.90,
        description: "1 docena variada 11cm tamaño regular",
        emoji: "👟"
    },
    {
        id: 14,
        name: "Docena Glaseadas",
        category: "docenas",
        price: 12.90,
        description: "1 docena donuts glaseada 11cm",
        emoji: "✨"
    },
    {
        id: 15,
        name: "Docena Premium",
        category: "docenas",
        price: 15.99,
        description: "1 docena Boston cream rellenas de pastelera",
        emoji: "🌟"
    },
    {
        id: 16,
        name: "Docena Donitas",
        category: "docenas",
        price: 9.00,
        description: "1 docena donitas pequeñas",
        emoji: "🐣"
    },

    // COMBOS
    {
        id: 17,
        name: "Combo Pa 2 - Anillos",
        category: "combos",
        price: 5.75,
        description: "2 vasos 14oz capuchino iced + 3 donuts anillo",
        emoji: "☕"
    },
    {
        id: 18,
        name: "Combo Pa 1 - Donut + Bebida",
        category: "combos",
        price: 3.70,
        original_price: 3.99,
        description: "1 vaso 14oz capuchino iced + 1 donut anillo",
        discount: 7,
        emoji: "⚡"
    },
    {
        id: 19,
        name: "Combo Pa Todos - 4 Bebidas + 12 Anillos",
        category: "combos",
        price: 17.99,
        original_price: 29.99,
        description: "4 vasos 14oz capuchino iced + 1 docena anillos",
        discount: 40,
        emoji: "🎉"
    },
    {
        id: 20,
        name: "Combo Pa 1 - 3 Minis + 1 Bebida",
        category: "combos",
        price: 4.99,
        description: "3 mini donuts + 1 bebida de tu elección",
        emoji: "🍴"
    },

    // 1/2 DOCENA
    {
        id: 21,
        name: "6 Donuts",
        category: "media-docena",
        price: 6.60,
        description: "6 donuts variada 11cm tamaño regular",
        emoji: "⚖️"
    },
    {
        id: 22,
        name: "6 Berlines",
        category: "media-docena",
        price: 6.60,
        description: "6 berlines con relleno variado",
        emoji: "🍪"
    },
    {
        id: 23,
        name: "6 Mini Donitas",
        category: "media-docena",
        price: 4.50,
        description: "6 donitas pequeñas 7cm de tamaño",
        emoji: "🎈"
    },
    {
        id: 24,
        name: "6 Premium",
        category: "media-docena",
        price: 7.99,
        description: "6 donuts con relleno, cobertura y toping",
        emoji: "💎"
    },

    // PA TRES
    {
        id: 25,
        name: "3 Anillos",
        category: "pa-tres",
        price: 3.30,
        description: "3 donuts 11cm tamaño regular",
        emoji: "🔢"
    },
    {
        id: 26,
        name: "3 Berlines",
        category: "pa-tres",
        price: 3.30,
        description: "3 berlines con relleno",
        emoji: "🎯"
    },
    {
        id: 27,
        name: "3 Mini Donitas",
        category: "pa-tres",
        price: 2.50,
        description: "3 donitas pequeñas - la dosis perfecta",
        emoji: "💫"
    },
    {
        id: 28,
        name: "3 Premium",
        category: "pa-tres",
        price: 3.99,
        description: "3 donuts con glaseado, relleno y toping",
        emoji: "👌"
    },

    // BEBIDAS FRÍAS
    {
        id: 29,
        name: "Bubble Coffee",
        category: "bebidas",
        price: 1.99,
        original_price: 2.99,
        description: "Vaso con café con burbujas",
        discount: 33,
        emoji: "☕"
    },
    {
        id: 30,
        name: "Bubble Tea",
        category: "bebidas",
        price: 2.99,
        description: "Delicioso té frío con burbujas",
        emoji: "🧋"
    },
    {
        id: 31,
        name: "Frapuchino",
        category: "bebidas",
        price: 2.99,
        description: "Delicioso batido con hielo de café",
        emoji: "🧊"
    },
    {
        id: 32,
        name: "Iced Capuchino",
        category: "bebidas",
        price: 2.50,
        description: "Vaso de capuchino en dos sabores y tamaños",
        emoji: "❄️"
    },
    {
        id: 33,
        name: "Iced Coffee",
        category: "bebidas",
        price: 2.99,
        description: "Vaso de café con hielos",
        emoji: "🍶"
    },
    {
        id: 34,
        name: "Iced Leche",
        category: "bebidas",
        price: 1.50,
        original_price: 2.50,
        description: "Vaso de leche con hielos",
        discount: 40,
        emoji: "🥛"
    },
    {
        id: 35,
        name: "Iced Tea",
        category: "bebidas",
        price: 2.50,
        description: "Vaso de té helado en dos sabores",
        emoji: "🍵"
    },
    {
        id: 36,
        name: "Smoothie",
        category: "bebidas",
        price: 4.50,
        description: "Vaso mezclado con frutas",
        emoji: "🍓"
    },

    // BEBIDAS CALIENTES
    {
        id: 37,
        name: "Americano",
        category: "bebidas",
        price: 1.79,
        original_price: 2.99,
        description: "Un expreso + 4oz de agua",
        discount: 40,
        emoji: "☕"
    },
    {
        id: 38,
        name: "Capuchino",
        category: "bebidas",
        price: 1.79,
        original_price: 2.99,
        description: "Clásico: 1 expreso + 4oz de leche",
        discount: 40,
        emoji: "🤎"
    },
    {
        id: 39,
        name: "Chocolate Caliente",
        category: "bebidas",
        price: 1.79,
        original_price: 2.99,
        description: "Leche y chocolate caliente",
        discount: 40,
        emoji: "🍫"
    },
    {
        id: 40,
        name: "Vaso Leche Caliente",
        category: "bebidas",
        price: 1.79,
        original_price: 2.99,
        description: "Vaso de leche caliente",
        discount: 40,
        emoji: "🥣"
    },

    // MERCADERÍA
    {
        id: 41,
        name: "Gorra Diseño 1",
        category: "mercaderia",
        price: 7.50,
        original_price: 12.50,
        description: "Gorra diseño limitado exclusivo",
        discount: 40,
        emoji: "🧢"
    },
    {
        id: 42,
        name: "Gorra Diseño 2",
        category: "mercaderia",
        price: 7.50,
        original_price: 12.50,
        description: "Gorra diseño limitado exclusivo",
        discount: 40,
        emoji: "🧢"
    },
    {
        id: 43,
        name: "Gorra Diseño 3",
        category: "mercaderia",
        price: 7.50,
        original_price: 12.50,
        description: "Gorra diseño limitado exclusivo",
        discount: 40,
        emoji: "🧢"
    },
    {
        id: 44,
        name: "Jarro Café 1",
        category: "mercaderia",
        price: 5.39,
        original_price: 8.99,
        description: "Jarro especial para café",
        discount: 40,
        emoji: "☕"
    },
    {
        id: 45,
        name: "Jarro Café 2",
        category: "mercaderia",
        price: 5.39,
        original_price: 8.99,
        description: "Jarro especial para café",
        discount: 40,
        emoji: "☕"
    },
    {
        id: 46,
        name: "Jarro Café 3",
        category: "mercaderia",
        price: 5.39,
        original_price: 8.99,
        description: "Jarro especial para café",
        discount: 40,
        emoji: "☕"
    },
    {
        id: 47,
        name: "Jarro Café 4",
        category: "mercaderia",
        price: 5.39,
        original_price: 8.99,
        description: "Jarro especial para café",
        discount: 40,
        emoji: "☕"
    },
    {
        id: 48,
        name: "Pin 1",
        category: "mercaderia",
        price: 1.19,
        original_price: 1.99,
        description: "Pin para colocar en maletas",
        discount: 40,
        emoji: "📍"
    },
    {
        id: 49,
        name: "Pin 2",
        category: "mercaderia",
        price: 1.19,
        original_price: 1.99,
        description: "Pin para colocar en maletas",
        discount: 40,
        emoji: "📍"
    },
    {
        id: 50,
        name: "Pin 3",
        category: "mercaderia",
        price: 1.19,
        original_price: 1.99,
        description: "Pin para colocar en maletas",
        discount: 40,
        emoji: "📍"
    },
    {
        id: 51,
        name: "Pin 4",
        category: "mercaderia",
        price: 1.19,
        original_price: 1.99,
        description: "Pin para colocar en maletas",
        discount: 40,
        emoji: "📍"
    }
];

// Render Products
function renderProducts(filter = 'all') {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';

    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-dt-pink';
        card.style.animationDelay = `${index * 0.05}s`;
        
        const priceHTML = product.original_price 
            ? `<div class="flex gap-3 items-center"><span class="text-2xl font-bold text-dt-pink">$${product.price}</span><span class="text-lg line-through text-gray-400">$${product.original_price}</span></div>`
            : `<span class="text-2xl font-bold text-dt-pink">$${product.price}</span>`;

        const discountBadge = product.discount 
            ? `<div class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">-${product.discount}%</div>`
            : '';

        card.innerHTML = `
            <div class="relative overflow-hidden bg-gradient-to-br from-dt-cream to-gray-100 p-6 text-center min-h-32 flex items-center justify-center">
                <div class="text-7xl">${product.emoji}</div>
                ${discountBadge}
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="mb-6">${priceHTML}</div>
                <a href="https://wa.me/593991412403?text=Me%20interesa%20${encodeURIComponent(product.name)}" target="_blank" class="w-full glow-button block bg-dt-pink text-white font-bold py-3 rounded-lg hover:bg-rose-600 transition-all duration-300 text-center">
                    Ordenar
                </a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Filter Events
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-dt-pink', 'text-white');
                b.classList.add('text-dt-pink', 'bg-white', 'border-2', 'border-dt-pink');
            });
            btn.classList.add('bg-dt-pink', 'text-white');
            btn.classList.remove('text-dt-pink', 'bg-white', 'border-2', 'border-dt-pink');
            
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initializeProductFilters();
});
