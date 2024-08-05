(function() {
    const searchInput = document.getElementById('search-input');
    const productsList = document.querySelectorAll('.item');
    const filterButton = document.getElementById('filter-button');
    const filterOptions = document.getElementById('filter-options');
    const filterPrecio = document.getElementById('filter-precio');
    let filterOptionsVisible = false;

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        productsList.forEach(product => {
            const title = product.querySelector('.info-product h2').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Mostrar/ocultar opciones de filtro con transición
    filterButton.addEventListener('click', (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del botón
        filterOptionsVisible = !filterOptionsVisible;
        if (filterOptionsVisible) {
            filterOptions.classList.remove('hidden');
            filterOptions.classList.add('visible');
        } else {
            filterOptions.classList.remove('visible');
            filterOptions.classList.add('hidden');
        }
    });

        // Filtrar por precio
    filterPrecio.addEventListener('change', () => {
        const order = filterPrecio.value;
        const itemsArray = Array.from(productsList);

        if (order === 'asc') {
            itemsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.fa-dollar-sign').textContent);
                const priceB = parseFloat(b.querySelector('.fa-dollar-sign').textContent);
                return priceA - priceB;
            });
        } else if (order === 'desc') {
            itemsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.fa-dollar-sign').textContent);
                const priceB = parseFloat(b.querySelector('.fa-dollar-sign').textContent);
                return priceB - priceA;
            });
        }

        const container = document.querySelector('.container-items');
        container.innerHTML = '';
        itemsArray.forEach(item => {
            container.appendChild(item);
        });
    });
})();
