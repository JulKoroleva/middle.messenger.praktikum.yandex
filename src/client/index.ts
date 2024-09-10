import './styles/index.scss';
import App from './App';
import { initializeInputFocusHandlers } from './utils/activateInputFocus';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render();

  const inputs = document.querySelectorAll('.input') as NodeListOf<HTMLElement>;
  initializeInputFocusHandlers(inputs);
});