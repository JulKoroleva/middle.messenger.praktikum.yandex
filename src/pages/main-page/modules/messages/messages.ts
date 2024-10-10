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

class Messages extends Block {
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

// Функция для получения сообщений из стора
const mapStateToProps = (state: { messages: Record<number, Message[]>; selectedChat?: number }) => {
  const selectedChatId = state.selectedChat;

  return {
    messages: selectedChatId !== undefined ? state.messages[selectedChatId] || [] : [],
  };
};

// Оборачиваем компонент с помощью withStore и передаем ID выбранного чата
export default withStore(mapStateToProps)(Messages);
