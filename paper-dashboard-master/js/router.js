export class Router {
    constructor() {
        this.routes = {
            '/': 'login.html',
            '/dashboard': 'dashboard.html'
        };
    }

    init() {
        // Cargar el index.html inicialmente
        this.loadRoute('/');

        // Manejar eventos de hashchange para la navegación
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

                    // Inicializar la lógica según la ruta
                    if (path === '/') {
                        this.initLogin();
                    } else if (path === '/dashboard') {
                        this.initDashboard();
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

                // Verificar credenciales con la API
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

            // Redirigir si ya está autenticado
            if (sessionStorage.getItem('authenticated') === 'true') {
                this.redirectToDashboard();
            }
        }
    }

    initDashboard() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                sessionStorage.removeItem('authenticated');
                this.redirectToLogin();
            });
        }
    }

    redirectToDashboard() {
        // Redirigir a dashboard.html y limpiar el hash de la URL
        window.location.hash = '/dashboard'; // Establecer el hash a '/dashboard'
        window.location.href = 'dashboard.html'; // Cambiar la URL a dashboard.html
    }

    redirectToLogin() {
        // Redirigir a login.html y limpiar el hash de la URL
        window.location.hash = ''; // Limpiar el hash
        window.location.href = 'index.html'; // Cambiar la URL a index.html
    }
}
