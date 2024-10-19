import Router from "./framework/Router";
import { Routes } from "./utils/Routes";
import chatController from "./controllers/chat.controller";
import UserAuthController from "./controllers/auth.controller";

import MainPage from "./pages/main-page/main-page";
import ProfilePage from "./pages/profile-page/profile-page.tmpl";
import ErrorPage from "./pages/error-page/error-page";
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signUp/signUp";

import "./utils/dom/registerComponent";
import "./styles/index.scss";
import { initializeInputFocusHandlers } from "./utils/dom/activateInputFocus";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Login, LoginPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.MainPage, MainPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Error, ErrorPage);

  try {
    Router.start();
    await UserAuthController.getUser();
    await chatController.fetchChats();
  } catch (e) {
    Router.start();
  }

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
