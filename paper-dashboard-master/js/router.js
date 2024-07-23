export class Router {
    constructor() {
        this.routes = {
            '/': 'login.html',
            '/dashboard': 'dashboard.html',
            '/employees': 'employees.html',
            '/productos': 'productos.html'
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

                    if (path === '/') {
                        this.loadLoginStyles();
                        this.initLogin();
                    } else {
                        this.removeLoginStyles();
                        if (path === '/dashboard') {
                            this.initDashboard();
                        } else if (path === '/employees') {
                            this.initEmployees();
                        } else if (path === '/productos') {
                            this.initProducts();
                        }
                        // Inicializa el botón de logout en todas las páginas
                        this.initLogout();
                    }
                })
                .catch(error => console.error('Error loading HTML:', error));
        }
    }

    loadLoginStyles() {
        const link = document.createElement('link');
        link.id = 'login-styles';
        link.rel = 'stylesheet';
        link.href = '/css/login.css';
        document.head.appendChild(link);
    }

    removeLoginStyles() {
        const link = document.getElementById('login-styles');
        if (link) {
            document.head.removeChild(link);
        }
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
                            this.redirectToDashboard();
                        } else {
                            alert('Invalid credentials');
                        }
                    })
                    .catch(error => console.error('Error fetching users:', error));
            });

            if (sessionStorage.getItem('authenticated') === 'true') {
                this.redirectToDashboard();
            }
        }
    }

    initDashboard() {
        // Lógica específica para la página del dashboard
    }

    initEmployees() {
        // Lógica específica para la página de empleados
    }

    initProducts() {
        // Lógica específica para la página de productos
    }

    initLogout() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('authenticated');
                this.redirectToLogin();
            });
        }
    }

    redirectToDashboard() {
        window.location.hash = '/dashboard';
    }

    redirectToLogin() {
        window.location.hash = '';
    }
}

// Inicializar el router
const router = new Router();
router.init();