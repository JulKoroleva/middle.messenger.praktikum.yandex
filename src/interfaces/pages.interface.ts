import { ChatInfo } from "./chat.interface";

export interface Pages {
  MainPage: string;
  LoginPage: string;
  SignupPage: string;
  ProfilePage: string;
  ErrorPage: string;
}

export interface PropsMainPage {
  messages: Message[];
  chats: ChatInfo[];
}

export interface PropsProfilePage {
  currentUserData: UserInfo;
}

export interface ProfilePageState {
  isEditing: boolean;
}

export interface ErrorPageProps {
  errorCode: string;
  description: string;
}

////////// Components
export interface PropsMessageItem {
  text: string;
  time: string;
  showDate: boolean;
  isCurrentUser: boolean;
}

export interface PropsChatItem {
  chatId: any;
  avatar: string,
  chatName: string;
  lastMessageDate: string;
  newMessages: number;
}

export interface PropsMainPage {
  chats: ChatInfo[];
  messages: Message[];
}

export interface PropsLeftPanel {
  chats: ChatInfo[];
}
export interface PropsChatListHeader {}

export interface PropsСhatList {
  chats: ChatInfo[];
}

export  interface PropsMessages {
  messages: Message[];
  avatar: string;
}
