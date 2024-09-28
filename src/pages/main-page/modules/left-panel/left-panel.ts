import Block from "../../../../framework/Block";
import templateLeftPanel from "./left-panel.hbs";

export default class LeftPanel extends Block {
  constructor(props: PropsLeftPanel) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(templateLeftPanel, this.props);
  }
}
