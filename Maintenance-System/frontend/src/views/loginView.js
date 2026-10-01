export class loginView {
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
  }

  // Métodos que a View expõe para o Controller
  bindSubmit(handler) {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      handler({ email, password });
    });
  }

  showError(message) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
  }

  clearError() {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = '';
  }
}