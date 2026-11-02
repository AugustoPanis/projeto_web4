export class NavView {
    constructor() {
        this.logoutButton = document.getElementById('logoutButton');
        this.navLinks = document.querySelectorAll('nav a[href]');

    }

    bindNavClick(handler) {
        this.navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.getAttribute('href'));
            });
        });
    }

    bindlogoutClick(handler) {
        this.logoutButton.addEventListener('click', () => {
            handler();
        });
    }
}