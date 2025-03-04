document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalProducts = document.getElementById('total-products');
    const totalPrice = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');

    let cart = [];

    function displayProducts(products) {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <a href="product-details.html?id=${product.id}" class="for-details">For Details</a>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <div class="product-buttons">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="remove-from-cart" data-id="${product.id}" style="display: none;">Cancel</button>
                </div>
            `;
            productList.appendChild(productElement);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function addToCart(event) {
        const productId = event.target.dataset.id;
        const productElement = event.target.closest('.product');
        const product = getProductById(productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Show "Cancel" button for the product
        productElement.querySelector('.remove-from-cart').style.display = 'inline-block';

        productElement.classList.add('selected');
        updateCart();
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.id;
        const productElement = document.querySelector(`.product-buttons [data-id="${productId}"]`).closest('.product');
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart = cart.filter(item => item.id !== productId);
            productElement.classList.remove('selected');
            // Hide "Cancel" button for the product
            productElement.querySelector('.remove-from-cart').style.display = 'none';
        }

        updateCart();
    }

    function getProductById(id) {
        return products.find(product => product.id === id);
    }

    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalProductCount = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
            totalProductCount += item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        totalProducts.textContent = totalProductCount;
        totalPrice.textContent = total.toFixed(2);

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    clearCartButton.addEventListener('click', () => {
        cart = [];
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.style.display = 'none';
        });
        updateCart();
    });

    const products = [
        {
            id: '1',
            image: 'product2.webp',
            name: 'Apple MacBook Pro MTL73 M3 Chip 2.75 to 4.05GHz',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 100.00
        },
        {
            id: '2',
            image: 'product1.webp',
            name: 'ASUS Vivobook 15 X515MA-BQ636T Intel Celeron N4020',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 15.00
        },
        {
            id: '3',
            image: 'product3.webp',
            name: 'iPhone 16 Pro Max 256GB/512GB/1TB (All Region)',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 20.00
        },
        {
            id: '4',
            image: 'product4.webp',
            name: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB)',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 25.00
        },
        {
            id: '5',
            image: 'product5.webp',
            name: 'Stainless Steel Analog Wrist Watch',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 30.00
        },
        {
            id: '6',
            image: 'product6.webp',
            name: 'Nova NV-9006 Fashion Hair Dryer',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 35.00
        },
        {
            id: '7',
            image: 'product7.webp',
            name: 'Ponds - Ponds Vanishing Cream',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 40.00
        },
        {
            id: '8',
            image: 'product8.webp',
            name: 'Box Balance Heel Shoes For Women',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel reprehenderit vero temporibus ea. Labore unde enim aperiam odio nisi deserunt?',
            price: 45.00
        }
    ];

    displayProducts(products);
});
