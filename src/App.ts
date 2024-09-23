import Handlebars from "handlebars";
import Pages from "./pages";

import chatData from "./mocks/chatsData";
import messages from "./mocks/messagesData";
import currentUserData from "./mocks/currentUserData";

import processMessages from "./utils/messages/processMessages";

import Button from "./components/button/button.tmpl";
import Input from "./components/input/input.tmpl";

Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: this.getPageFromUrl(),
      chats: chatData,
      messages: processMessages(messages),
      currentUserData: currentUserData,
    };
    this.appElement = document.getElementById("app");

    window.addEventListener("popstate", () => {
      this.setState({ currentPage: this.getPageFromUrl() });
    });
  }

  render(): void {
    if (!this.appElement) return;

    let template: Handlebars.TemplateDelegate<any>;

    switch (this.state.currentPage) {
      case "/":
        break;
        case "/chats":
          template = Handlebars.compile(Pages.MainPage);
          this.appElement.innerHTML = template({
            chats: this.state.chats,
            messages: this.state.messages,
          });
          break;
      case "/profile":
        template = Handlebars.compile(Pages.ProfilePage);
        this.appElement.innerHTML = template({
          userData: this.state.currentUserData,
        });
        break;
      case "/login":
        template = Handlebars.compile(Pages.LoginPage);
        this.appElement.innerHTML = template({});
        break;
      case "/signup":
        template = Handlebars.compile(Pages.SignupPage);
        this.appElement.innerHTML = template({});
        break;
      case "/error":
        const errorCode = "404";
        const description = "Такой страницы нет";
        template = Handlebars.compile(Pages.ErrorPage);
        this.appElement.innerHTML = template({
          errorCode: errorCode,
          description: description,
        });
        break;
      default:
        template = Handlebars.compile(Pages.MainPage);
    }

    this.addEventListeners();
  }

  addEventListeners(): void {
    const links: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll("a[data-page]");
    links.forEach((link) => {
      link.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLAnchorElement;
        const page = target.getAttribute("data-page");
        if (page) {
          this.navigate(page);
        }
      });
    });
  }

  navigate(page: string): void {
    history.pushState({}, "", page);
    this.setState({ currentPage: page });
  }

  getPageFromUrl(): string {
    return window.location.pathname || "/";
  }

  setState(newState: Partial<AppState>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
