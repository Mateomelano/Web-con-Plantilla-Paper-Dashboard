
    const items = document.querySelectorAll('.item');
    console.log(items); // Verifica que se están seleccionando los elementos correctamente

    items.forEach(item => {
        const productName = item.querySelector('h2').textContent.trim();
        console.log(productName); // Verifica el nombre del producto

        if (productName === 'Zapatos Nike') {
            const newParagraph = document.createElement('p');
            newParagraph.className = 'rubro';
            newParagraph.innerHTML = 'Rubro:Calzado';

            const marcaElement = item.querySelector('.marca');
            console.log(marcaElement); // Verifica que se encuentra el elemento con la clase 'marca'

            marcaElement.insertAdjacentElement('afterend', newParagraph);
        }
    });
