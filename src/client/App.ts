import Handlebars from "handlebars";
import Pages from "./pages";

import chatData from "./utils/mock/chatsData";
import messages from "./utils/mock/messagesData";
import currentUserData from "./utils/mock/currentUserData";

import processMessages from "./utils/processMessages";

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
      currentUserData: currentUserData
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
        template = Handlebars.compile(Pages.MainPage);
        this.appElement.innerHTML = template({ chats: this.state.chats, messages: this.state.messages });
        break;
      case "/profile":
        template = Handlebars.compile(Pages.ProfilePage);
        this.appElement.innerHTML = template({ userData: this.state.currentUserData });
        break;
      case "/login":
        template = Handlebars.compile(Pages.LoginPage);
        this.appElement.innerHTML = template({});
        break;
      case "/signup":
        template = Handlebars.compile(Pages.SignupPage);
        this.appElement.innerHTML = template({});
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