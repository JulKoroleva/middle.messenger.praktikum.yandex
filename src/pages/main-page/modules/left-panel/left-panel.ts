import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";
import { ChatInfo } from "../../../../utils/api/chat-api";
import { withStore } from "../../../../framework/Store";

interface PropsLeftPanel {
  chats: ChatInfo[];
  changePage: (page: string) => void;
}

class LeftPanel extends Block {
  constructor(props: PropsLeftPanel) {
    super({
      ...props,
      chats: props.chats,
      changePage: props.changePage,
    });
  }

  render() {
    return this.compile(templateLeftPanel, this.props);
  }
}

const mapStateToProps = (state: { chats: ChatInfo[] }) => {
  return {
    chats: state.chats,
  };
};

export default withStore(mapStateToProps)(LeftPanel);
