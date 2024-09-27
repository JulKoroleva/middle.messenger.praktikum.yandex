import union from "../../../../../../../static/assets/union.svg";
import Block from "../../../../../../framework/Block";
import templateChatItem from "./chatItem.hbs";

export default class ChatItem extends Block {
  constructor(props: PropsChatItem) {
    const hasNewMessages = props.newMessages !== "0" && props.newMessages !== "";

    console.log('props',props)
    super({
      ...props,
      hasNewMessages,
      icon: union,
    });
  }

  render() {
    console.log('this.props',this.props)
    return this.compile(templateChatItem, this.props);
  }
}
