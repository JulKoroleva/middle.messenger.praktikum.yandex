
// import Pages from "./pages";
import { LoginPage } from "./pages/login/index";
import { SignupPage } from "./pages/signUp/index";

import chatData from "./mocks/chatsData";
import messages from "./mocks/messagesData";
import currentUserData from "./mocks/currentUserData";

import processMessages from "./utils/messages/processMessages";
import { registerComponent } from './utils/dom/registerComponent';
import Form from './components/form/form';
import Button from './components/button/button';
import Input from './components/input/input';
import renderTemplate from "./utils/dom/render";

registerComponent('Form', Form);
registerComponent('Button', Button);
registerComponent('Input', Input);

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
        renderTemplate('login')
        // console.log('case "/login":')
        // const loginPage = new LoginPage();
        // console.log('loginPage.getContent()' ,loginPage.getContent());
        // pageContent = loginPage.getContent();
        break;
      case "/signup":
        renderTemplate('signup')
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
    console.log('this.state.currentPage', this.state.currentPage)
    this.render();
  }
}
