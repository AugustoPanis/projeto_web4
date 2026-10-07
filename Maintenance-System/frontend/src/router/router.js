import { loginController } from '../controllers/loginController.js';

const routes = {
  '/frontend/': {
    page: './pages/login/login.html',
    controller: loginController
  },

  '/login': {
    page: './pages/login/login.html',
    controller: loginController
  },

  '/dashboard': {
    page: './pages/dashboard/dashboard.html',
    controller: loginController
  }
};

export async function router() {
  let path = window.location.pathname;

  if (!routes[path]) {
    console.error('Rota não encontrada:', path);
    return;
  }

  const response = await fetch(routes[path].page);
  const html = await response.text();

  document.getElementById('app').innerHTML = html;

  routes[path].controller.init();
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  router();
}