(function() {
    const searchInput = document.getElementById('search-input');
    const productsList = document.querySelectorAll('.item');
    const productContainer = document.getElementById('product-container');

    console.log(searchInput);  // Verificar si searchInput está correctamente seleccionado
    console.log(productsList);  // Verificar si productsList está correctamente seleccionado

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
})();