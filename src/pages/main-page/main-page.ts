import Block from "../../framework/Block";
import templateMainPage from "./main-page.hbs";
import { ChatInfo } from "../../utils/api/chat-api";
import { withStore } from "../../framework/Store";
import chatController from "../../controllers/chat.controller";


class MainPage extends Block {
  constructor(props: PropsMainPage) {
    super({
      ...props,
      chats: props.chats,
      messages: props.messages,
      changePage: props.changePage,
    });
  }

  init() {
    chatController.fetchChats();
  }

  render() {
    return this.compile(templateMainPage, this.props);
  }
}

const mapStateToProps = (state: {
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
}) => {
  return {
    chats: state.chats,
    messages: state.messages,
  };
};

export default withStore(mapStateToProps)(MainPage);
