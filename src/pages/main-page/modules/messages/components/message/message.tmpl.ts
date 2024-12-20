import Block from "../../../../../../framework/Block";
import { PropsMessageItem } from "../../../../../../interfaces/pages.interface";
import templateMessageItem from "./message.hbs";

export default class MessageItem extends Block {
  constructor(props: PropsMessageItem) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(templateMessageItem, this.props);
  }
}
