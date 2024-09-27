import Block from "../../framework/Block";
import templateInput from "./input.hbs";
import { activatePlaceholder, deactivatePlaceholder } from "../../utils/dom/activateInputFocus";
import { validateInput } from "../../validators/form.validator";

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: (e: Event) => {
          activatePlaceholder(e.target as HTMLInputElement);
        },
        focusout: (e: Event) => {
          deactivatePlaceholder(e.target as HTMLInputElement)
          validateInput(e.target as HTMLInputElement)
        }
      }
    })
  }

  render() {
    return this.compile(templateInput, this.props)
  }
}
