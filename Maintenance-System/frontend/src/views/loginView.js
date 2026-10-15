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
      handler(); }   );
  }

    bindForgotPaswordClick(credentials) {
    this.btnForgotPassword.addEventListener('click', (execute) => {

      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();

      credentials({ email });
    });
  }

  bindSignIn(credentials) {
    this.btnSingIn.addEventListener('click', (execute) => {
      execute.preventDefault();
      this.clearError();

      const email = this.emailInput.value.trim();
      const password = this.passwordInput.value;

      credentials({ email, password });
    });
  }



  showError(message) {
    this.errorEl.textContent = message;
  }

  clearError() {
    this.errorEl.textContent = '';
  }
}