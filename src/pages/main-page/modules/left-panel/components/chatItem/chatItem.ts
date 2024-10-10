import union from "../../../../../../../static/assets/union.svg";
import chatController from "../../../../../../controllers/chat.controller";
import Block from "../../../../../../framework/Block";
import templateChatItem from "./chatItem.hbs";

export default class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    const hasNewMessages =
      props.newMessages !== "0" && props.newMessages !== "";

    super({
      ...props,
      hasNewMessages,
      icon: union,
    });

    // Добавляем обработчик события после вызова super()
    this.setProps({
      events: {
        click: this.onChatClick.bind(this), // Явная привязка контекста
      },
    });
  }

  onChatClick() {
    console.log('Chat clicked:', this.props.chatId); // Лог для проверки
    chatController.selectChat(this.props.chatId); // Выбираем чат
  }

  render() {
    return this.compile(templateChatItem, this.props);
  }
}
