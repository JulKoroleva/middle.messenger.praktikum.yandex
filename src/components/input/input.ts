import Block from "../../framework/Block";
// import { handleFocusInput, handleFocusoutInput } from "../../utils/handleFocusInput";
// import { checkInputValidation } from "../../utils/formValidation";
import templateInput from "./input.hbs";

interface InputProps {
  inputName: string,
  inputLabel: string;
  inputType: string;
  inputMainClass: string;
  inputClass: string;
  labelClass: string;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        focus: (e: Event) => {
          // handleFocusInput(e.target as HTMLInputElement);
        },
        focusout: (e: Event) => {
          // handleFocusoutInput(e.target as HTMLInputElement)
          // checkInputValidation(e.target as HTMLInputElement)
        }
      }
    })
  }

  render() {
    return this.compile(templateInput, this.props)
  }
}