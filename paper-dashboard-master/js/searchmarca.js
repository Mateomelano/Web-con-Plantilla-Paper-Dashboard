(function() {
    function initializeFilters() {
        const filterMarca = document.getElementById('filter-marca');
        const filterPrecio = document.getElementById('filter-precio');
        const filterCodigo = document.getElementById('filter-codigo');


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

        const productsList = document.querySelectorAll('.container-items .item');

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

        // Filtrar por código
        filterCodigo.addEventListener('change', () => {
            const order = filterCodigo.value;
            const itemsArray = Array.from(productsList);

            if (order === 'asc') {
                itemsArray.sort((a, b) => {
                    const codeA = parseInt(a.querySelector('.code').textContent.replace(/\D/g, ''));
                    const codeB = parseInt(b.querySelector('.code').textContent.replace(/\D/g, ''));
                    return codeA - codeB;
                });
            } else if (order === 'desc') {
                itemsArray.sort((a, b) => {
                    const codeA = parseInt(a.querySelector('.code').textContent.replace(/\D/g, ''));
                    const codeB = parseInt(b.querySelector('.code').textContent.replace(/\D/g, ''));
                    return codeB - codeA;
                });
            }

            const container = document.querySelector('.container-items');
            container.innerHTML = '';
            itemsArray.forEach(item => {
                container.appendChild(item);
            });
        });
    }

    // Expone la función `initializeFilters` globalmente para que pueda ser llamada después de la inyección
    window.initializeFilters = initializeFilters;

})();
