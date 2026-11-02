export class ForgotPasswordView {
  constructor() {
    this.emailInput = document.getElementById('email');
    this.btnForgotPassword = document.getElementById('btn-forgotPassword');
    this.btnSingIn = document.getElementById('btn-signIn');
    this.errorEl = document.getElementById('error-message');
    this.successEl = document.getElementById('success-message');
  }
  
  bindSignIpClick(handler) {
    this.btnSingIn.addEventListener('click', () => {
      this.clearError();
      handler();
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
  showSuccess(message) {
    this.successEl.textContent = message;
  }

  clearError() {
    this.errorEl.textContent = '';
  }
}