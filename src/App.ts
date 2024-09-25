
// import Pages from "./pages";
import { LoginPage } from "./pages/login/index";
import { SignupPage } from "./pages/signUp/index";

import chatData from "./mocks/chatsData";
import messages from "./mocks/messagesData";
import currentUserData from "./mocks/currentUserData";

import processMessages from "./utils/messages/processMessages";

interface AppState {
  currentPage: string;
  chats: any[];
  messages: any[];
  currentUserData: any;
}

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: '/login',
      chats: chatData,
      messages: processMessages(messages),
      currentUserData: currentUserData,
    };
    this.appElement = document.getElementById("app");
  }

  render(): string {
    if (!this.appElement) return "";
  
    let pageContent;
    switch (this.state.currentPage) {
      case "/login":
        const loginPage = new LoginPage();
        console.log('loginPage.getContent()' ,loginPage.getContent());
        pageContent = loginPage.getContent();
        break;
      case "/signup":
        const signupPage = new SignupPage();
        console.log('signupPage.getContent()' ,signupPage.getContent());
        pageContent = signupPage.getContent();
        break;
      // Добавьте остальные страницы, если необходимо
      default:
        console.warn("Unknown page: ", this.state.currentPage);
        return "";
    }
  
    console.log('pageContent', pageContent)
    if (pageContent) {
      console.log('pageContent', pageContent)
      this.appElement.innerHTML = ""; // Очистка содержимого
      this.appElement.appendChild(pageContent); // Добавление нового содержимого
    }
  
    return "";
  }

  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}
