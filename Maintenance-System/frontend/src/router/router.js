import { loginController } from '../controllers/loginController.js';

const routes = {
  '/': {
    page: './pages/login/login.html',
    controller: loginController,
    public: true
  },

  '/dashboard': {
    page: './pages/dashboard/dashboard.html',
    controller: null,
    public: false
  }
};

let checkingAuth = null;

export async function router() {
  let path = window.location.pathname;

  if (!routes[path]) {
    console.error('Rota não encontrada:', path);
    return;
  }

  checkingAuth ??= routes[path].controller.checkAuth();


  const user = await checkingAuth;

  if (!routes[path].public && !user) {
    navigate('/login', true);
    return;
  }

  if (routes[path].public && user) {
    navigate('/dashboard', true);
    return;
  }

  const response = await fetch(routes[path].page);

  if (!response.ok) {
    console.error('Erro ao carregar página:', response.status);
    return;
  }

  const html = await response.text();

  document.getElementById('app').innerHTML = html;

  routes[path].controller.init();
}

export function navigate(path, replace = false) {
  if (replace) {
    window.history.replaceState({}, '', path);
  } else {
    window.history.pushState({}, '', path);
  }

  router();
}

window.addEventListener('popstate', router);
