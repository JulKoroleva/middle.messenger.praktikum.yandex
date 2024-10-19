import Block from "../../../../framework/Block";
import templateMessages from "./messages.hbs";
import Avatar from "../../../../../static/assets/union.svg";
import { withStore } from "../../../../framework/Store";
import chatController from "../../../../controllers/chat.controller";

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
    chatController.fetchChats();
  }

  render() {
    return this.compile(templateMessages, this.props);
  }
}
const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat || 0;
  const selectedChat = state.chats?.find((chat) => chat.id === selectedChatId);
  const userId = state?.user?.id;
  const messages = (state.messages || {})[selectedChatId] || [];

  const updatedMessages = messages.map((message: Message) => ({
    ...message,
    isMine: message.user_id === userId,
  }));
  return {
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat,
    messages: updatedMessages,
    userId: state?.user?.id,
    chatName: selectedChat ? selectedChat.title : "Чат",
  };
});

export const Messages = withChats(MessagesBase);
