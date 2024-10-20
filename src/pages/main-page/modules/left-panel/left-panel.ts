import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";
import { withStore } from "../../../../framework/Store";
import { ChatInfo } from "../../../../interfaces/chat.interface";
import { PropsLeftPanel } from "../../../../interfaces/pages.interface";

class LeftPanel extends Block {
  constructor(props: PropsLeftPanel) {
    super({
      ...props,
      chats: props.chats
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
