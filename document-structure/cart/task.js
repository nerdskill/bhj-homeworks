document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const cart = document.querySelector('.cart__products');
    const cartTitle = document.querySelector('.cart__title');

    const loadCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        for (let id in cartItems) {
            addToCart(id, cartItems[id].image, cartItems[id].count, false);
        }
        updateCartVisibility();
    };

    const saveCart = () => {
        const cartItems = {};
        cart.querySelectorAll('.cart__product').forEach(cartItem => {
            const id = cartItem.dataset.id;
            const count = cartItem.querySelector('.cart__product-count').textContent;
            const image = cartItem.querySelector('.cart__product-image').src;
            cartItems[id] = { count: count, image: image };
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    const updateCartVisibility = () => {
        if (cart.children.length > 0) {
            cartTitle.style.display = 'block';
            cart.style.display = 'block';
        } else {
            cartTitle.style.display = 'none';
            cart.style.display = 'none';
        }
    };

    const addToCart = (id, image, count, shouldAnimate = true) => {
        const cartItem = cart.querySelector(`.cart__product[data-id="${id}"]`);
        if (cartItem) {
            const cartItemCount = cartItem.querySelector('.cart__product-count');
            cartItemCount.textContent = parseInt(cartItemCount.textContent) + parseInt(count);
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = id;
            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${image}">
                <div class="cart__product-count">${count}</div>
                <a href="#" class="cart__product-remove">&times;</a>
            `;
            cartProduct.querySelector('.cart__product-remove').addEventListener('click', (event) => {
                event.preventDefault();
                cartProduct.remove();
                saveCart();
                updateCartVisibility();
            });
            cart.appendChild(cartProduct);
        }
        saveCart();
        updateCartVisibility();

        if (shouldAnimate) {
            animateProductToCart(id, image);
        }
    };

    const animateProductToCart = (id, image) => {
        const product = document.querySelector(`.product[data-id="${id}"]`);
        const productImage = product.querySelector('.product__image');
        const productImageClone = productImage.cloneNode();

        productImageClone.style.position = 'absolute';
        productImageClone.style.left = productImage.getBoundingClientRect().left + 'px';
        productImageClone.style.top = productImage.getBoundingClientRect().top + 'px';
        productImageClone.style.width = productImage.width + 'px';
        productImageClone.style.height = productImage.height + 'px';
        productImageClone.style.transition = 'all 0.5s ease';

        document.body.appendChild(productImageClone);

        setTimeout(() => {
            const cartProductImage = document.querySelector(`.cart__product[data-id="${id}"] .cart__product-image`);
            productImageClone.style.left = cartProductImage.getBoundingClientRect().left + 'px';
            productImageClone.style.top = cartProductImage.getBoundingClientRect().top + 'px';
            productImageClone.style.width = cartProductImage.width + 'px';
            productImageClone.style.height = cartProductImage.height + 'px';
        }, 10);

        setTimeout(() => {
            productImageClone.remove();
        }, 510);
    };

    products.forEach(product => {
        const quantityControls = product.querySelector('.product__quantity-controls');
        const quantityValue = product.querySelector('.product__quantity-value');
        const addButton = product.querySelector('.product__add');

        quantityControls.addEventListener('click', (event) => {
            if (event.target.classList.contains('product__quantity-control_dec')) {
                if (parseInt(quantityValue.textContent) > 1) {
                    quantityValue.textContent = parseInt(quantityValue.textContent) - 1;
                }
            }
            if (event.target.classList.contains('product__quantity-control_inc')) {
                quantityValue.textContent = parseInt(quantityValue.textContent) + 1;
            }
        });

        addButton.addEventListener('click', () => {
            const id = product.dataset.id;
            const image = product.querySelector('.product__image').src;
            const count = quantityValue.textContent;
            addToCart(id, image, count);
        });
    });

    loadCart();
});
