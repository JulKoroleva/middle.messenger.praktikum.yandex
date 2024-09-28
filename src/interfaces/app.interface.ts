interface AppState {
  currentPage: string;
  chats: Chat[];
  messages: Message[];
  currentUserData: UserInfo;
  errorCode: string;
  description: string;
}
