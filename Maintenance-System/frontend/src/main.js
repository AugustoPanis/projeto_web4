import { loginView } from './views/loginView.js';
import { authService } from './services/authService.js';
import { loginController } from './Controllers/loginController.js';

document.addEventListener('DOMContentLoaded', () => {
  const view = new loginView();
  const service = new authService();

  loginController.init(); // Sem o "new"
});