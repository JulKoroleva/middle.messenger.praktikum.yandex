import Block from "../../framework/Block";
import templateButton from "./button.hbs";
export default class Button extends Block {
  constructor(props: PropsButton) {
    super({
      ...props,
      events: {
        click: (e: Event | MouseEvent) => props.onClick?.(e),
      },
    });
  }

  render() {
    return this.compile(templateButton, this.props);
  }
}
