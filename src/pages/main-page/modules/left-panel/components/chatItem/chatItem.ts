import union from "../../../../../../../static/assets/union.svg";
import Block from "../../../../../../framework/Block";
import templateChatItem from "./chatItem.hbs";

export default class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    const hasNewMessages = props.newMessages !== "0" && props.newMessages !== "";

    super({
      ...props,
      hasNewMessages,
      icon: union,
    });
  }

  render() {
    return this.compile(templateChatItem, this.props);
  }
}
