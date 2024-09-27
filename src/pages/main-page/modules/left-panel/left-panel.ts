import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";

export default class LeftPanel extends Block {
  constructor(props: PropsLeftPanel) {
    console.log("props",props);
    super({
      ...props,
    });
  }

  render() {
    console.log("LeftPanel", this.props);
    return this.compile(templateLeftPanel, this.props);
  }
}
