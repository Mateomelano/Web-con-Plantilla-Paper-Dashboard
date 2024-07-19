export class Router {
    constructor() {
        this.routes = {
            '/': 'login.html',
            '/dashboard': 'dashboard.html',
            '/employees': 'employees.html',
            '/products':  'productos.html',
        };
    }

    init() {
        window.addEventListener('hashchange', () => this.loadRoute(window.location.hash));
        this.loadRoute(window.location.hash || '#/'); // Cargar el login inicialmente
    }

    loadRoute(hash) {
        const path = hash.replace('#', '') || '/';
        const htmlFile = this.routes[path];

        if (htmlFile) {
            fetch(htmlFile)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;

                    // Inicializar la lógica según la ruta
                    if (path === '/') {
                        this.initLogin();
                    } else {
                        this.initNavigation(); // Para manejar logout y navegación
                    }
                })
                .catch(error => console.error('Error loading HTML:', error));
        }
    }

    initLogin() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                // Simulación de autenticación
                if (email && password) {
                    sessionStorage.setItem('authenticated', 'true');
                    window.location.hash = '/dashboard'; // Navegar a la página de contenido
                } else {
                    alert('Invalid credentials');
                }
            });

            // Redirigir si ya está autenticado
            if (sessionStorage.getItem('authenticated') === 'true') {
                window.location.hash = '/dashboard'; // Redirigir si ya está autenticado
            }
        }
    }

    initNavigation() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('authenticated');
                window.location.hash = '/'; // Volver al login
            });
        }
    }
}
