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
  inputValue: unknown,
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(templateInput, this.props)
  }
}