export class ToastView {
    constructor() {
        this.container = document.getElementById('toast-container');
    }

    show(message, type = 'error', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast-custom ${type}`;
        toast.setAttribute('role', 'alert');
        toast.textContent = message;

        this.container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, duration);
    }

    error(message) { this.show(message, 'error'); }
    success(message) { this.show(message, 'success'); }
}