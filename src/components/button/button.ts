import Block from "../../framework/Block";
import templateButton from "./button.hbs";
export default class Button extends Block {
  constructor(props: PropsButton) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(templateButton, this.props);
  }
}
