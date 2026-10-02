export class LoginView {
  constructor() {
    this.app = document.getElementById('app');
  }

  render() {
    this.app.innerHTML = `
      <main class="login-container">
        <form id="login-form">
          <h2>Acesso ao Sistema</h2>
          
          <label for="email">E-mail</label>
          <input type="email" id="email" required autocomplete="username">

          <label for="password">Senha</label>
          <input type="password" id="password" required autocomplete="current-password">

          <button type="submit" id="btn-submit">Entrar</button>
          <p id="error-message" class="error"></p>
        </form>
      </main>
    `;

    this.form = document.getElementById('login-form');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.submitBtn = document.getElementById('btn-submit');
    this.errorEl = document.getElementById('error-message');
  }

  bindSubmit(handler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
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