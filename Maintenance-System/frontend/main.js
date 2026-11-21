import { router } from './src/router/router.js';
const path = window.location.pathname;

if (path === "/") {
  window.history.replaceState({}, "", "/login");
}
router();