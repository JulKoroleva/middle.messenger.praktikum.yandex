import Block from "../../framework/Block";
import template from "./popup.hbs";

export default class Popup extends Block {
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => this.handleClick(event),
      },
    });
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.dataset.close === "true") {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
