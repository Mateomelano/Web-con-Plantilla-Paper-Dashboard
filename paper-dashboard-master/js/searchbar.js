(function() {
    const searchInput = document.getElementById('search-input');
    const productsList = document.querySelectorAll('.item');
    const filterButton = document.getElementById('filter-button');
    const filterOptions = document.getElementById('filter-options');
    const filterMarca = document.getElementById('filter-marca');
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


    // Mostrar/ocultar opciones de filtro
    filterButton.addEventListener('click', () => {
        if (filterOptionsVisible) {
            filterOptions.classList.add('hidden');
        } else {
            filterOptions.classList.remove('hidden');
        }
        filterOptionsVisible = !filterOptionsVisible;
    });

    

})();