import Block from "../../../../framework/Block";
import templateMessages from "./messages.hbs";
import Avatar from "../../../../../static/assets/union.svg"

export default class Messages extends Block {
  constructor(props: PropsMessages) {
    super({
      ...props,
      avatar: Avatar,
      changePage: props.changePage
    });
  }

  render() {
    return this.compile(templateMessages, this.props);
  }
}
