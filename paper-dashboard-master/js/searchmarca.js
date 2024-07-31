(function() {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');

    let isHidden = true;

    btnCart.addEventListener('click', () => {
        if (isHidden) {
            containerCartProducts.classList.remove('hidden-cart');
        } else {
            containerCartProducts.classList.add('hidden-cart');
        }
        isHidden = !isHidden; // Alternar el estado
    });

    const cartInfo = document.querySelector('.cart-product');
    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    let allProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');
    const filterMarca = document.querySelector('#filter-marca');

    const saveCart = () => {
        localStorage.setItem('cartProducts', JSON.stringify(allProducts));
    };

    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.closest('.item');

            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('.fa-dollar-sign').textContent.trim(),
            };

            const exists = allProducts.some(
                product => product.title === infoProduct.title
            );

            if (exists) {
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                allProducts = [...products];
            } else {
                allProducts = [...allProducts, infoProduct];
            }

            saveCart();
            showHTML();
        }
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('icon-close')) {
            const product = e.target.closest('.cart-product');
            const title = product.querySelector('.titulo-producto-carrito').textContent;

            allProducts = allProducts.filter(
                product => product.title !== title
            );

            saveCart();
            showHTML();
        }
    });

    const showHTML = () => {
        if (!allProducts.length) {
            cartEmpty.classList.remove('hidden');
            rowProduct.classList.add('hidden');
            cartTotal.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            rowProduct.append(containerProduct);

            total += parseInt(product.quantity * product.price);
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    };

    const filterProductsByMarca = (marca) => {
        const items = document.querySelectorAll('.container-items .item');
        items.forEach(item => {
            const productMarca = item.querySelector('.marca').textContent.trim();
            if (marca === 'all' || productMarca.includes(marca)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    filterMarca.addEventListener('change', (e) => {
        const selectedMarca = e.target.value;
        filterProductsByMarca(selectedMarca);
    });

    showHTML(); // Mostrar los productos al cargar la página
})();