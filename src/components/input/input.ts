import Block from "../../framework/Block.ts";
import templateInput from "./input.hbs";
import { activatePlaceholder, deactivatePlaceholder } from "../../utils/dom/activateInputFocus.ts";
import { validateInput } from "../../validators/form.validator.ts";

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: (e: Event) => {
          console.log("Focus event triggered"); // Отладочный лог
          activatePlaceholder(e.target as HTMLInputElement);
        },
        focusout: (e: Event) => {
          console.log("Focus event triggered"); // Отладочный лог
          deactivatePlaceholder(e.target as HTMLInputElement)
          validateInput(e.target as HTMLInputElement)
        }
      }
    })
  }

  public getProps() {
    return this.props;
  }

  public getEvents() {
    return this.props.events;
  }

  render() {
    return this.compile(templateInput, this.props)
  }
}
