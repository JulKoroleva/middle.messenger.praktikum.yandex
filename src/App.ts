import MainPage from "./pages/main-page/main-page";
import ProfilePage from "./pages/profile-page/profile-page.tmpl";
import ErrorPage from "./pages/error-page/error-page";
import  LoginPage from "./pages/login/login";
import  SignupPage  from "./pages/signUp/signUp";

import chatData from "./mocks/chatsData";
import messages from "./mocks/messagesData";
import currentUserData from "./mocks/currentUserData";

import processMessages from "./utils/messages/processMessages";
import "./utils/dom/registerComponent";

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: "login",
      chats: chatData,
      messages: processMessages(messages),
      currentUserData: currentUserData,
      errorCode: "404",
      description: "Такой страницы нет",
    };
    this.appElement = document.getElementById("app");
    this.render();
  }

  render(): string {
    if (!this.appElement) return "";

    let pageContent;
    switch (this.state.currentPage) {
      case "login":
        pageContent = new LoginPage({
          changePage: this.changePage.bind(this),
        }).getContent();
        break;
      case "signup":
        pageContent = new SignupPage({
          changePage: this.changePage.bind(this),
        }).getContent();
        break;
      case "mainPage":
        pageContent = new MainPage({
          messages: this.state.messages,
          chats: this.state.chats,
          changePage: this.changePage.bind(this),
        }).getContent();
        break;
      case "profile":
        pageContent = new ProfilePage({
          currentUserData: this.state.currentUserData,
          changePage: this.changePage.bind(this),
        }).getContent();
        break;
      default:
        pageContent = new ErrorPage({
          errorCode: this.state.errorCode,
          description: this.state.description,
          changePage: this.changePage.bind(this),
        }).getContent();
    }

    if (pageContent) {
      this.appElement.innerHTML = "";
      this.appElement.appendChild(pageContent);
    }

    return "";
  }

  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}
