interface Pages {
  MainPage: string;
  LoginPage: string;
  SignupPage: string;
  ProfilePage: string;
  ErrorPage: string;
}

interface PropsMainPage {
  messages: Message[];
  chats: Chat[];
  changePage: (page: string) => void;
}

interface LoginPageProps {
  changePage: (page: string) => void;
}

interface SignupPageProps {
  changePage: (page: string) => void;
}

interface PropsProfilePage {
  currentUserData: UserInfo;
  changePage: (page: string) => void;
}

interface ProfilePageState {
  isEditing: boolean;
}

interface ErrorPageProps {
  errorCode: string;
  description: string;
  changePage: (page: string) => void;
}

////////// Components
interface PropsMessageItem {
  text: string;
  time: string;
  showDate: boolean;
  isCurrentUser: boolean;
}

interface PropsChatItem {
  chatId: any;
  chatName: string;
  lastMessageDate: string;
  newMessages: number;
}

interface PropsMainPage {
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  changePage: (page: string) => void;
}

interface PropsLeftPanel {
  chats: Chat[];
  changePage: (page: string) => void;
}
interface PropsChatListHeader {
  changePage: (page: string) => void;
}
interface PropsMessages {
  messages: Message[];
  changePage: (page: string) => void;
}

interface PropsСhatList {
  chats: Chat[];
}
interface PropsDialogHeader {
  avatar: string;
  chatName: string;
  changePage: (page: string) => void;
}
