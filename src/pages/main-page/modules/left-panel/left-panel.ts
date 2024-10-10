import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";
import { ChatInfo } from "../../../../utils/api/chat-api"; // Импорт интерфейса чата
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

// Функция для получения списка чатов из стора
const mapStateToProps = (state: { chats: ChatInfo[] }) => {
  return {
    chats: state.chats,
  };
};

// Оборачиваем компонент с помощью withStore
export default withStore(mapStateToProps)(LeftPanel);
