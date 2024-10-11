import union from "../../../../../../../static/assets/union.svg";
import chatController from "../../../../../../controllers/chat.controller";
import Block from "../../../../../../framework/Block";
import store, { withStore } from "../../../../../../framework/Store"; // Импорт store для получения сообщений
import templateChatItem from "./chatItem.hbs";

export class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    // Вызываем родительский конструктор и передаем props
    super(props);

    // Инициализация переменных
    const hasNewMessages = props.newMessages !== 0;
    // Устанавливаем свойства через super и setProps
    this.setProps({
      ...props,
      hasNewMessages,
      icon: union,
    });

    // Добавляем обработчик событий
    this.setProps({
      events: {
        click: this.onChatClick.bind(this),
      },
    });
  }

  onChatClick() {
    chatController.selectChat(this.props.chatId);
  }

  render() {
    return this.compile(templateChatItem, this.props);
  }
}



