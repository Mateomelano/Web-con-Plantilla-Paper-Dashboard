function loadSelect(id) {
    console.log(id);
    return fetch('filter-selects.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.querySelector(id).outerHTML;
        });
}

function injectFilters() {
    const filterOptions = document.getElementById('filter-options');
    const variable = 1; 

    if (variable === 1) {
        loadSelect('#filter-marca').then(selectHTML => {
            filterOptions.insertAdjacentHTML('beforeend', selectHTML);
        });

        loadSelect('#filter-precio').then(selectHTML => {
            filterOptions.insertAdjacentHTML('beforeend', selectHTML);
        });

        loadSelect('#filter-codigo').then(selectHTML => {
            filterOptions.insertAdjacentHTML('beforeend', selectHTML);
        });
    }
    // Puedes agregar más condiciones según necesites
}
console.log("hola");
document.addEventListener('DOMContentLoaded', injectFilters);
