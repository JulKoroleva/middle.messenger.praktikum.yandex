import './styles/index.scss';
import App from './App';
import { initializeInputFocusHandlers } from './utils/activateInputFocus';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render();

  const inputs = document.querySelectorAll('.dynamic-input') as NodeListOf<HTMLElement>;
  initializeInputFocusHandlers(inputs);

  const textarea = document.querySelector<HTMLTextAreaElement>('.dialog__input-bar__input');
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    });
  }

  const forms = document.querySelectorAll('form') as NodeListOf<HTMLFormElement>;
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // предотвращение отправки формы и перезагрузки
    });
  });

  const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // предотвращение стандартного действия кнопок
    });
  });
});