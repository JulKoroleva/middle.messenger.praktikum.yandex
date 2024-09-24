import Block from "../../framework/Block";
import templateButton from "./button.hbs";

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return (
      this.compile(templateButton, this.props).firstElementChild?.outerHTML ||
      ""
    );
  }
}
