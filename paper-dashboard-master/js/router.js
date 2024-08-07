import * as sidebar from './sidebar.js';

export class Router {
    constructor() {
        this.routes = {
            '/': 'login.html',
            '/menu': 'menu.html',
            '/sidebar': 'sidebar.html',
            '/productos': 'productos.html',
            '/rubros': 'rubros.html',
            '/marcas': 'marcas.html',
            '/ofertas': 'ofertas.html',
            '/combos': 'combos.html',
            '/novedades': 'novedades.html'
        };
    }

    init() {
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
    }

    handleHashChange() {
        const path = window.location.hash.replace('#', '') || '/';
        this.loadRoute(path);
    }

    loadRoute(path) {
        const htmlFile = this.routes[path];

        if (htmlFile) {
            fetch(htmlFile)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;
                    this.removeAllStyles();
                    

                    if (path === '/') {
                        this.loadLoginStyles();
                        this.initLogin();
                        this.hideSidebarNavbar();
                    } else {
                        if (path === '/menu') {
                            this.loadMenuStyles();
                            this.initMenu();
                        } else if (path === '/productos') {
                            this.loadProductsStyles();
                            this.loadProductsScripts();
                            this.initProducts();
                            this.inyection();
                        } else if (path === '/rubros') {
                            this.loadRubrosStyles();
                            this.initRubros();
                        } else if (path === '/marcas') {
                            this.loadMarcasStyles();
                            this.initMarcas();
                        } else if (path === '/ofertas') {
                            this.loadOfertasStyles();
                            this.initOfertas();
                        } else if (path === '/combos') {
                            this.loadCombosStyles();
                            this.initCombos();
                        } else if (path === '/novedades') {
                            this.loadNovedadesStyles();
                            this.initNovedades();
                        }
                        this.showSidebarNavbar();
                        
                    }

                    sidebar.updateSidebarActiveLink(path);
                })
                .catch(error => console.error('Error loading HTML:', error));
        }
    }



    loadLoginStyles() {
        this.loadStyles('login-styles', '/css/login.css');
    }

    loadMenuStyles() {
        this.loadStyles('menu-styles', '/css/menu.css');
    }

    loadProductsScripts() {
        // Llamar a removeAllScripts antes de cargar nuevos scripts
        this.removeAllScripts();
        
        // Cargar scripts en el orden necesario
        this.loadScripts('carrito-script', '/js/carrito.js');
        this.loadScripts('searchbar-script', '/js/searchbar.js');
        this.loadScripts('searchmarca-script', '/js/searchmarca.js');
        this.loadScripts('botones-script', '/js/botones.js');
        this.loadScripts('addrubro-script', '/js/addrubro.js');
    }
    

    loadProductsStyles() {
        this.loadStyles('products-styles', '/css/productos.css');
    }

    loadRubrosStyles() {
        this.loadStyles('rubros-styles', '/css/rubros.css');
    }

    loadMarcasStyles() {
        this.loadStyles('marcas-styles', '/css/marcas.css');
    }

    loadOfertasStyles() {
        this.loadStyles('ofertas-styles', '/css/ofertas.css');
    }

    loadCombosStyles() {
        this.loadStyles('combos-styles', '/css/combos.css');
    }

    loadNovedadesStyles() {
        this.loadStyles('novedades-styles', '/css/novedades.css');
    }

    loadStyles(id, href) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    loadScripts(id, src) {
        // Eliminar el script existente si ya está en el DOM
        const existingScript = document.getElementById(id);
        if (existingScript) {
            document.body.removeChild(existingScript);
        }
        
        // Crear un nuevo script
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.onload = () => console.log(`Script ${src} cargado correctamente`);
        script.onerror = () => console.error(`Error al cargar el script ${src}`);
        document.body.appendChild(script);
    }

    removeAllStyles() {
        ['login-styles', 'menu-styles', 'employees-styles', 'products-styles', 'rubros-styles', 'marcas-styles', 'ofertas-styles', 'combos-styles', 'novedades-styles'].forEach(id => {
            const link = document.getElementById(id);
            if (link) {
                document.head.removeChild(link);
            }
        });
    }

    removeAllScripts() {
        ['login-scripts', 'menu-scripts', 'products-scripts', 'rubros-scripts', 'marcas-scripts', 'ofertas-scripts', 'combos-scripts', 'novedades-scripts'].forEach(id => {
            const script = document.getElementById(id);
            if (script) {
                document.body.removeChild(script);
            }
        });
    }

    hideSidebarNavbar() {
        document.getElementById('sidebar-container').innerHTML = '';
        document.getElementById('navbar-container').innerHTML = '';
    }


    showSidebarNavbar() {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('sidebar-container').innerHTML = html;
                sidebar.initLogout(); // Llama a initLogout después de cargar el sidebar
                sidebar.updateSidebarActiveLink(window.location.hash.replace('#', '') || '/');
                this.loadStyles('novedades-styles', '/css/sidebar.css');
            });
        fetch('navbar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('navbar-container').innerHTML = html;
                sidebar.initLogout(); // Llama a initLogout después de cargar el navbar
            });
    }

    initLogin() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
    
                fetch('https://655133be7d203ab6626ea39e.mockapi.io/users')
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.json();
                    })
                    .then(users => {
                        const user = users.find(user => user.email === email && user.password === password);
                        if (user) {
                            sessionStorage.setItem('authenticated', 'true');
                            this.redirectToMenu();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error de autenticación',
                                text: 'Las credenciales no son válidas',
                            });
                        }
                    })
                    .catch(error => console.error('Error fetching users:', error));
            });
    
            if (sessionStorage.getItem('authenticated') === 'true') {
                this.redirectToMenu();
            }
        }
    }

    inyection() {
        let filtersInjected = false;
    
        function loadSelect(id) {
            console.log('Cargando select con id:', id);
            return fetch('filter-selects.html')  
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    const element = div.querySelector(id);
                    if (!element) throw new Error(`Elemento con id ${id} no encontrado en filter-selects.html`);
                    return element.outerHTML;
                })
                .catch(error => {
                    console.error('Error al cargar el select:', error);
                });
        }
    
        function injectFilters() {
            if (filtersInjected) return; // Salir si ya se inyectaron los filtros
            filtersInjected = true;
    
            console.log("Entró a injectFilters");
            const filterOptions = document.getElementById('filter-options');
            const variable = 1; 
    
            if (variable === 1) {
                console.log("Variable es 1, cargando selects...");
                Promise.all([
                    loadSelect('#filter-marca'),
                    loadSelect('#filter-precio'),
                    loadSelect('#filter-codigo')
                ]).then(selectsHTML => {
                    selectsHTML.forEach(selectHTML => {
                        if (selectHTML) filterOptions.insertAdjacentHTML('beforeend', selectHTML);
                    });
                    // Llama a initializeFilters después de inyectar todos los selects
                    setTimeout(() => {
                        if (typeof window.initializeFilters === 'function') {
                            window.initializeFilters();
                        } else {
                            console.error("initializeFilters no está definido");
                        }
                    }, 0); // Puede ajustar el tiempo si es necesario
                });
                
            }
        }
    
        console.log("Iniciando la inyección de filtros...");
        document.addEventListener('DOMContentLoaded', injectFilters());
    }
    

    redirectToMenu() {
        window.location.hash = '#/menu';
    }

    initMenu() {
        // Lógica de inicialización del menu
    }

    initEmployees() {
        // Lógica de inicialización de employees
    }

    initProducts() {
        // Lógica de inicialización de productos
    }

    initRubros() {
        // Lógica de inicialización de rubros
    }

    initMarcas() {
        // Lógica de inicialización de marcas
    }

    initOfertas() {
        // Lógica de inicialización de ofertas
    }

    initCombos() {
        // Lógica de inicialización de combos
    }

    initNovedades() {
        // Lógica de inicialización de novedades
    }
}

// Inicializar el router
const router = new Router();
router.init();