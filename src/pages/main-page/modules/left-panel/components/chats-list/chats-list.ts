import Block from "../../../../../../framework/Block";
import templateСhatList from "./chats-list.hbs";

interface PropsСhatList {
  chats: Chat[]
}

export default class СhatList extends Block {
  constructor(props: PropsСhatList) {
    console.log("props",props);
    super({
      ...props,
    });
  }

  render() {
    return this.compile(templateСhatList, this.props);
  }
}

