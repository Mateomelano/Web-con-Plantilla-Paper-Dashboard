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
        this.loadScripts('products-scripts', '/js/carrito.js');
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
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
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
                            alert('Invalid credentials');
                        }
                    })
                    .catch(error => console.error('Error fetching users:', error));
            });

            if (sessionStorage.getItem('authenticated') === 'true') {
                this.redirectToMenu();
            }
        }
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