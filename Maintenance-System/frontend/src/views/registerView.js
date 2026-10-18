export class RegisterView {
  constructor() {
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.errorEl = document.getElementById('error-message');
    this.btnSingUp = document.getElementById('btn-singUp');
    this.btnSingIn = document.getElementById('btn-singIn');
    this.name = document.getElementById('name');
    this.cpf = document.getElementById('cpf');

  }
  bindSingInClick(handler) {
    this.btnSingIn.addEventListener('click', (execute) => {
      handler();
    });
  }

  bindSingUpClick(handler) {
    this.btnSingUp.addEventListener('click', (execute) => {
      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();
      const password = this.passwordInput.value;
      const name = this.name.value.trim();
      const cpf = this.cpf.value.trim();

      handler({ email, password, name, cpf });
    });
  }

  showError(message) {
    this.errorEl.textContent = message;
  }

  showSuccess(message) {
    this.errorEl.textContent = message;
  }

  clearError() {
    this.errorEl.textContent = '';
  }
}