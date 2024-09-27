import Block from "../../../../framework/Block";
// import messages from "../../../../mocks/messagesData";
import templateMessages from "./messages.hbs";
import Avatar from "../../../../../static/assets/union.svg"

interface PropsMessages {
  messages: Messages[]
}
export default class Messages extends Block {
  constructor(props: PropsMessages) {
    super({
      ...props,
      avatar: Avatar,
    });
  }

  render() {
    return this.compile(templateMessages, this.props);
  }
}
