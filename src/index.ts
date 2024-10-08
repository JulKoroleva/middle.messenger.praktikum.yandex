import "./styles/index.scss";
import App from "./App";
import { initializeInputFocusHandlers } from "./utils/dom/activateInputFocus";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.render();

  const initializeInputs = () => {
    const inputs = document.querySelectorAll(
      ".dynamic-input"
    ) as NodeListOf<HTMLElement>;
    initializeInputFocusHandlers(inputs);
  };

  initializeInputs();

  const observer = new MutationObserver(initializeInputs);
  observer.observe(document.body, { childList: true, subtree: true });

  const textarea = document.querySelector<HTMLTextAreaElement>(
    ".dialog__input-bar__input"
  );
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    });
  }
});
