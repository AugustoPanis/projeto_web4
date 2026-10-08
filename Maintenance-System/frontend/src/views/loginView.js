export class LoginView {
  constructor() {
    this.form = document.getElementById('login-form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.errorEl = document.getElementById('error-message');
  }

  bindSubmit(handler) {
    this.form.addEventListener('submit', (execute) => {
      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();
      const password = this.passwordInput.value;

      handler({ email, password });
    });
  }

  showError(message) {
    this.errorEl.textContent = message;
  }

  clearError() {
    this.errorEl.textContent = '';
  }
}