import Handlebars from "handlebars";
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
      currentPage: 'createQuestionnaire',
      chats: chatData,
      messages: processMessages(messages),
      currentUserData: currentUserData,
    };
    this.appElement = document.getElementById("app");
  }

  render(): string {
    if (!this.appElement) return "";

    switch (this.state.currentPage) {
      // case "/":
      // case "/chats":
      //   template = Handlebars.compile(Pages.MainPage);
      //   this.appElement.innerHTML = template({
      //     chats: this.state.chats,
      //     messages: this.state.messages,
      //   });
      //   break;
      // case "/profile":
      //   template = Handlebars.compile(Pages.ProfilePage);
      //   this.appElement.innerHTML = template({
      //     userData: this.state.currentUserData,
      //   });
      //   break;
      case "/login":
        const loginPage = new LoginPage();
        console.log(loginPage.getContent());
        this.appElement.replaceWith(loginPage.getContent());
        break;
      case "/signup":
        const signupPage = new SignupPage();
        console.log(signupPage.getContent());
        this.appElement.replaceWith(signupPage.getContent());
        break;
      // case "/error":
      //   const errorCode = "404";
      //   const description = "Такой страницы нет";
      //   template = Handlebars.compile(Pages.ErrorPage);
      //   this.appElement.innerHTML = template({
      //     errorCode: errorCode,
      //     description: description,
      //   });
      //   break;
      default:
        // template = Handlebars.compile(Pages.MainPage);
    }

    return "";
  }

  createQuestionnaire(): void {
      this.render();
    }
  

  changePage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}
