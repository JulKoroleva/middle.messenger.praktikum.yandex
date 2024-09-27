

import Block from "../../../../../../framework/Block";
import templateMessageItem from "./message.hbs";
interface PropsMessageItem {
  text: string;
  time: string;
  showDate: boolean;
  isCurrentUser: boolean;
}

export default class MessageItem extends Block {
  constructor(props: PropsMessageItem) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(templateMessageItem, this.props);
  }
}
