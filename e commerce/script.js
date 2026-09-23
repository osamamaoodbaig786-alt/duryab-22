// Product Catalog Organized by Categories and Specific Brands
const products = [
    // Perfumes: J. & Versace
    { id: 1, category: 'perfumes', brand: 'J.', name: 'Zarar Gold EDP', price: '$65', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
    { id: 2, category: 'perfumes', brand: 'Versace', name: 'Eros Eau de Parfum', price: '$120', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
    
    // Shirts: Outfitters & Royal Tag
    { id: 3, category: 'shirts', brand: 'Outfitters', name: 'Urban Casual Denim Shirt', price: '$45', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600' },
    { id: 4, category: 'shirts', brand: 'Royal Tag', name: 'Executive Formal Dress Shirt', price: '$55', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600' },

    // Shoes: Ndure & Borjan
    { id: 5, category: 'shoes', brand: 'Ndure', name: 'Athletic Runner Sneaker', price: '$50', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600' },
    { id: 6, category: 'shoes', brand: 'Borjan', name: 'Classic Leather Loafers', price: '$75', img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600' },

    // Watches: Rolex & Omega
    { id: 7, category: 'watches', brand: 'Rolex', name: 'Submariner Date', price: '$12,500', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600' },
    { id: 8, category: 'watches', brand: 'Omega', name: 'Speedmaster Moonwatch', price: '$7,200', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600' }
];

// Global Cart Counter State
let cartItemsCount = 0;

// Render Products Dynamically into exact Grid Sections
function loadProducts() {
    products.forEach(product => {
        const gridElement = document.getElementById(`grid-${product.category}`);
        if (gridElement) {
            const cardHTML = `
                <div class="product-card">
                    <span class="brand-badge">${product.brand}</span>
                    <img src="${product.img}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">${product.price}</div>
                        <button class="add-to-cart-btn" onclick="addToCart()">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            gridElement.innerHTML += cardHTML;
        }
    });
}

// Add to Cart Counter Logic
function addToCart() {
    cartItemsCount++;
    document.getElementById('cartCount').innerText = cartItemsCount;
}

// Filter Sections by Category Buttons or Nav Links
function filterCategory(categoryName, event) {
    const sections = document.querySelectorAll('.category-section');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update Active Button State (if clicked via filter bar)
    if (event) {
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Toggle Section Visibility
    sections.forEach(section => {
        if (categoryName === 'all' || section.id === categoryName) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Initialize on Load
window.onload = loadProducts;