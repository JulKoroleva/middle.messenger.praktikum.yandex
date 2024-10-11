import union from "../../../../../../../static/assets/union.svg";
import chatController from "../../../../../../controllers/chat.controller";
import Block from "../../../../../../framework/Block";
import store, { withStore } from "../../../../../../framework/Store"; // Импорт store для получения сообщений
import templateChatItem from "./chatItem.hbs";

class ChatItemBase extends Block {
  constructor(props: PropsChatItem) {
    const hasNewMessages = props.newMessages !== 0;

    const messagesState = store.getState().messages || {};

    const chatMessages = messagesState[props.chatId] || [];

    const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].content : ""; // Берем последнее сообщение

    super({
      ...props,
      hasNewMessages,
      lastMessage,
      icon: union,
    });

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

// Используем withStore для подписки на изменения в store
const withChatData = withStore((state) => {
  const messagesState = state.messages || {};
  
  // Используем this.props для получения chatId из пропсов, которые были переданы в Block
  return (ownProps: PropsChatItem) => {
    const chatMessages = messagesState[ownProps.chatId] || [];

    return {
      lastMessage: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].content : "", // Обновляем последнее сообщение
    };
  };
});


export const ChatItem = withChatData(ChatItemBase);
