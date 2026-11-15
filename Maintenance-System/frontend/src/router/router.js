import { loginController } from '../controllers/loginController.js';
import { registerController } from '../controllers/registerController.js';
import { forgotPasswordController } from '../controllers/forgotPasswordController.js';
import { dashboardController } from '../controllers/dashboardController.js';
import { equipamentsController } from '../controllers/equipamentsController.js';
import { techniciansController } from '../controllers/techniciansController.js';
import { categoryController } from '../controllers/categoryController.js';
import { locationController } from '../controllers/locationController.js';

const routes = {
  '/login': {
    page: './pages/login/login.html',
    controller: loginController,
    public: true
  },
    '/equipment': {
    page: './pages/equipaments/equipaments.html',
    controller: equipamentsController,
    public: false
  },
  '/technicians': {
    page: './pages/technicians/technicians.html',
    controller: techniciansController,
    public: true
  },
  '/register': {
    page: './pages/register/register.html',
    controller: registerController,
    public: true
  },
  '/forgot-password': {
    page: './pages/login/forgot-password.html',
    controller: forgotPasswordController,
    public: true
  },
  '/dashboard': {
    page: './pages/dashboard/dashboard.html',
    controller: dashboardController,
    public: false
  },
  '/category': {
    page: './pages/category/category.html',
    controller: categoryController,
    public: false
  },
  '/location': {
    page: './pages/location/location.html',
    controller: locationController,
    public: false
  }
};

export async function router() {

  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    console.error('Rota não encontrada:', path);
    return;
  }

  const user = await route.controller.checkAuth();

  // if (!route.public && !user) {
  //   navigate('/login', true);
  //   return;
  // }

  // if (route.public && user) {
  //   navigate('/dashboard', true);
  //   return;
  // }

  const response = await fetch(route.page);
  const html = await response.text();
  document.getElementById('app').innerHTML = html;

  route.controller.init();
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