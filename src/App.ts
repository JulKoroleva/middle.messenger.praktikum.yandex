
// import Pages from "./pages";
import { LoginPage } from "./pages/login/index";
import { SignupPage } from "./pages/signUp/index";

import "./helpers/isCurrentUser.helper";
import "./helpers/formatDate.helper";
import "./helpers/formatTime.helper";

import chatData from "./mocks/chatsData";
import messages from "./mocks/messagesData";
import currentUserData from "./mocks/currentUserData";

import processMessages from "./utils/messages/processMessages";
// import renderTemplate from "./utils/dom/render";
import { registerComponent } from './utils/dom/registerComponent';

import Form from './components/form/form';
import Button from './components/button/button';
import Input from './components/input/input';
import ChatListHeader from "./pages/main-page/modules/left-panel/components/chat-list-header/chat-list-header";
import СhatList from "./pages/main-page/modules/left-panel/components/chats-list/chats-list";
import ChatItem from "./pages/main-page/modules/left-panel/components/chatItem/chatItem";
import DialogHeader from "./pages/main-page/modules/messages/components/dialog-header/dialog-header.tmpl";
import InputBar from "./pages/main-page/modules/messages/components/input-bar/input-bar.tmpl";
import MessageItem from "./pages/main-page/modules/messages/components/message/message.tmpl";
import Messages from "./pages/main-page/modules/messages/messages";
import LeftPanel from "./pages/main-page/modules/left-panel/left-panel";
import MainPage from "./pages/main-page/main-page";
import ProfilePage from "./pages/profile-page/profile-page.tmpl";
import ErrorPage from "./pages/error-page/error-page.tmpl";

registerComponent('Form', Form);
registerComponent('Button', Button);
registerComponent('Input', Input);

registerComponent('LeftPanel', LeftPanel);
registerComponent('СhatList', СhatList);
registerComponent('ChatListHeader', ChatListHeader);
registerComponent('ChatItem', ChatItem);

registerComponent('DialogHeader', DialogHeader);
registerComponent('InputBar', InputBar);
registerComponent('MessageItem', MessageItem);
registerComponent('Messages', Messages);

interface AppState {
  currentPage: string;
  chats: any[];
  messages: any[];
  currentUserData: UserInfo;
  errorCode: string,
  description: string,
}

export default class App {
  private state: AppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'profile',
      chats: chatData,
      messages: processMessages(messages),
      currentUserData: currentUserData,
      errorCode: '404',
      description: 'Такой страницы нет',
    };
    this.appElement = document.getElementById("app");
    this.render();
  }

  render(): string {
    if (!this.appElement) return "";

    let pageContent;
    switch (this.state.currentPage) {
      case "login":
        pageContent = new LoginPage({ changePage: this.changePage.bind(this) }).getContent();
        break;
      case "signup":
        pageContent = new SignupPage({ changePage: this.changePage.bind(this) }).getContent();
        break;
      case "mainPage":
        pageContent = new MainPage({ messages: this.state.messages, chats: this.state.chats, changePage: this.changePage.bind(this) }).getContent();
        break;
        case "profile":
          pageContent = new ProfilePage({ currentUserData: this.state.currentUserData, changePage: this.changePage.bind(this) }).getContent();
          break;
      default:
        pageContent = new ErrorPage({ errorCode: this.state.errorCode, description: this.state.description, changePage: this.changePage.bind(this) }).getContent();
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