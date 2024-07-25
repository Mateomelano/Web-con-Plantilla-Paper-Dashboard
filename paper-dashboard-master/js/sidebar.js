// sidebar.js

export function initLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('authenticated');
            window.location.hash = '#/';
        });
    } 
}

export function updateSidebarActiveLink(path) {
    const navItems = document.querySelectorAll('.sidebar-wrapper .nav li');
    navItems.forEach(item => {
        const anchor = item.querySelector('a');
        if (anchor && anchor.getAttribute('href') === `#${path}`) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}