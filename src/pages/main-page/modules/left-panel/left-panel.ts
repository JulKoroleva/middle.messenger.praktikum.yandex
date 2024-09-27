import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";

interface PropsLeftPanel {
  chats: Chat[];
  changePage: (page: string) => void;
}
export default class LeftPanel extends Block {
  constructor(props: PropsLeftPanel) {
    console.log("props",props);
    super({
      ...props,
      changePage: (e: MouseEvent) => {
        props.changePage("profile");
      },
    });
  }

  render() {
    console.log("LeftPanel", this.props);
    return this.compile(templateLeftPanel, this.props);
  }
}
