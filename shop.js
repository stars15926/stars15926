// 商品列表
const products = [
    { id: 1, name: 'Apple', price: 1.2 },
    { id: 2, name: 'Banana', price: 0.8 },
    { id: 3, name: 'Orange', price: 1.5 },
    { id: 4, name: 'Grapes', price: 2.0 },
    { id: 5, name: 'Mango', price: 2.5 }
];

// 购物车
let cart = [];

// 显示商品
function displayProducts() {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// 添加商品到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// 更新购物车
function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

// 从购物车中移除商品
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

// 清空购物车
function clearCart() {
    cart = [];
    updateCart();
}

// 提交订单
function submitOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    alert(`Order submitted! Total price: $${totalPrice.toFixed(2)}`);
    cart = [];
    updateCart();
}

// 页面初始化
window.onload = function() {
    displayProducts();
    document.getElementById('clear-cart').onclick = clearCart;
    document.getElementById('submit-order').onclick = submitOrder;
};
