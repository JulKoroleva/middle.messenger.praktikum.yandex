import union from "../../../../../../../static/assets/union.svg";
import chatController from "../../../../../../controllers/chat.controller";
import Block from "../../../../../../framework/Block";
import { PropsChatItem } from "../../../../../../interfaces/pages.interface";
import templateChatItem from "./chatItem.hbs";

export class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    super(props);
console.log('proops', props)
console.log('props.avatar', props.avatar)
const avatarPath = "https://ya-praktikum.tech/api/v2/resources/";
const icon = props.avatar?.startsWith('/')
      ? `${avatarPath}${props.avatar}`
      : props.avatar || union;

    const hasNewMessages = props.newMessages !== 0;
    this.setProps({
      ...props,
      hasNewMessages,
      icon: icon,
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
