import Block from "../../framework/Block";
import messages from "../../mocks/messagesData";
import templateMainPage from "./main-page.hbs";

interface PropsMainPage {
  messages: Message[];
  chats: Chat[];
  changePage: (page: string) => void;
}

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
    console.log("MainPage", this.props);
    return this.compile(templateMainPage, this.props);
  }
}
