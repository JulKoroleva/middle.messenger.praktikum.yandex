import union from "../../../../../../../static/assets/union.svg";
import chatController from "../../../../../../controllers/chat.controller";
import Block from "../../../../../../framework/Block";
import templateChatItem from "./chatItem.hbs";

export class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    super(props);

    const hasNewMessages = props.newMessages !== 0;
    this.setProps({
      ...props,
      hasNewMessages,
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
