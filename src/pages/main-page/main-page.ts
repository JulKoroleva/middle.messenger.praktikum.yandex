import Block from "../../framework/Block";
import templateMainPage from "./main-page.hbs";

export default class MainPage extends Block {
  constructor(props: PropsMainPage) {
    super({
      ...props,
      messages: props.messages,
      chats: props.chats,
      changePage: props.changePage
    });
  }

  render() {
    return this.compile(templateMainPage, this.props);
  }
}
