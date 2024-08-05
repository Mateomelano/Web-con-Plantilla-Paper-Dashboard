(function() {
    const searchInput = document.getElementById('search-input');
    const productsList = document.querySelectorAll('.item');
    const filterButton = document.getElementById('filter-button');
    const filterOptions = document.getElementById('filter-options');
    const filterSoloOfertas = document.getElementById('filter-solo-ofertas');
    const filterSoloConStock = document.getElementById('filter-solo-con-stock');
    const productCount = document.getElementById('product-count');
    let filterOptionsVisible = false;
    let stockFilterActive = false;

    searchInput.addEventListener('input', () => {
        filterProducts(searchInput.value.toLowerCase(), false, stockFilterActive);
    });

    filterButton.addEventListener('click', (event) => {
        event.preventDefault();
        filterOptionsVisible = !filterOptionsVisible;
        if (filterOptionsVisible) {
            filterOptions.classList.remove('hidden');
            filterOptions.classList.add('visible');
        } else {
            filterOptions.classList.remove('visible');
            filterOptions.classList.add('hidden');
        }
    });

    filterSoloOfertas.addEventListener('click', () => {
        filterProducts(searchInput.value.toLowerCase(), true, stockFilterActive);
    });

    filterSoloConStock.addEventListener('click', () => {
        stockFilterActive = !stockFilterActive;  // Toggle stock filter
        filterProducts(searchInput.value.toLowerCase(), false, stockFilterActive);
    });

    function filterProducts(searchTerm = '', soloOfertas = false, soloConStock = false) {
        let visibleProductsCount = 0;
        productsList.forEach(product => {
            const title = product.querySelector('.info-product h2').textContent.toLowerCase();
            const isInStock = parseInt(product.getAttribute('data-stock'), 10) > 1;
            const isOffer = product.getAttribute('data-offer') === 'true';
            let isVisible = true;

            if (soloOfertas && !isOffer) {
                isVisible = false;
            }

            if (soloConStock && !isInStock) {
                isVisible = false;
            }

            if (!title.includes(searchTerm)) {
                isVisible = false;
            }

            if (isVisible) {
                product.style.display = 'block';
                visibleProductsCount++;
            } else {
                product.style.display = 'none';
            }
        });
        productCount.textContent = `${visibleProductsCount} productos encontrados`;
    }
    

    // Initial filter to count all products
    filterProducts();

    






    
})();
