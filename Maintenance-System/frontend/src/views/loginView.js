export class LoginView {
  constructor() {
    this.form = document.getElementById('login-form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.errorEl = document.getElementById('error-message');
    this.btnSingIn = document.getElementById('btn-singIn');
    this.btnSingUp = document.getElementById('btn-singUp');
    this.btnForgotPassword = document.getElementById('btn-forgotPassword')
  }

  bindSingUpClick(handler) {
    this.btnSingUp.addEventListener('click', () => {
      this.clearError();
      handler();
    });
  }

  bindForgotPaswordClick(handler) {
    this.btnForgotPassword.addEventListener('click', () => {
      this.clearError();
      handler();
    });
  }

  bindSignIn(handler) {
    this.btnSingIn.addEventListener('click', (execute) => {
      execute.preventDefault();
      this.clearError();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

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