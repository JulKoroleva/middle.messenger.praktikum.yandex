import Block from "../../../../../../framework/Block";
import templateСhatList from "./chats-list.hbs";
import {PropsСhatList} from "../../../../../../interfaces/pages.interface";

export default class СhatList extends Block {
  constructor(props: PropsСhatList) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(templateСhatList, this.props);
  }
}
