export class LoginView {
  constructor() {
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.errorEl = document.getElementById('error-message');
    this.btnSingIn = document.getElementById('btn-singIn');
    this.btnSingUp = document.getElementById('btn-singUp');
    this.btnForgotPassword = document.getElementById('btn-forgotPassword')
  }

  bindSingUpClick(handler) {
    this.btnSingUp.addEventListener('click', (execute) => {
      handler();
    });
  }

    bindSignIn(handler) {
    this.btnSingIn.addEventListener('submit', (execute) => {
      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();
      const password = this.passwordInput.value;

      handler({ email, password });
    });
  }

  bindForgotPaswordClick(handler) {
    this.btnForgotPassword.addEventListener('click', (execute) => {
      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();

      handler({ email });
    });
  }

  showError(message) {
    this.errorEl.textContent = message;
  }

  clearError() {
    this.errorEl.textContent = '';
  }
}