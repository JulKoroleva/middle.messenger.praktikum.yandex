import Block from "../../framework/Block";
import templateMainPage from "./main-page.hbs";
import { ChatInfo } from "../../utils/api/chat-api"; // Импорт интерфейсов для чатов и сообщений
import { withStore } from "../../framework/Store";
import { Message } from "../../controllers/message.controller";
import chatController from "../../controllers/chat.controller"; 

interface PropsMainPage {
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  changePage: (page: string) => void;
}

class MainPage extends Block {
  constructor(props: PropsMainPage) {
    super({
      ...props,
      chats: props.chats,
      messages: props.messages,
      changePage: props.changePage,
    });
  }

  init() {
    console.log('Messages component initialized, fetching chats...');
    chatController.fetchChats(); // Вызов метода для получения чатов
  }
  
  render() {
    return this.compile(templateMainPage, this.props);
  }
}

// Функция для получения списка чатов и сообщений из стора
const mapStateToProps = (state: { chats: ChatInfo[]; messages: Record<number, Message[]> }) => {
  return {
    chats: state.chats,
    messages: state.messages,
  };
};

// Оборачиваем компонент с помощью withStore
export default withStore(mapStateToProps)(MainPage);
