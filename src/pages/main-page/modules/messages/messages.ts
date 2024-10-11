import Block from "../../../../framework/Block";
import templateMessages from "./messages.hbs";
import Avatar from "../../../../../static/assets/union.svg";
import { withStore } from "../../../../framework/Store";
import { Message } from "../../../../controllers/message.controller";
import chatController from "../../../../controllers/chat.controller"; // Импорт chatController

interface PropsMessages {
  messages: Message[];
  changePage: (page: string) => void;
  avatar: string;
}

class MessagesBase extends Block {
  constructor(props: PropsMessages) {
    super({
      ...props,
      avatar: Avatar,
      changePage: props.changePage,
      messages: props.messages,
    });
  }

  componentDidMount() {
    console.log('MainPage mounted, fetching chats...');
    chatController.fetchChats(); // Вызов метода для получения чатов
  }

  render() {
    return this.compile(templateMessages, this.props);
  }
}
const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat || 0;
  const selectedChat = state.chats?.find(chat => chat.id === selectedChatId);

  return {
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    messages: (state.messages || {})[selectedChatId] || [],
    userId: state?.user?.id,
    chatName: selectedChat ? selectedChat.title : "Чат"  // Получаем название чата или используем дефолтное значение
  }
});

export const Messages = withChats(MessagesBase);
