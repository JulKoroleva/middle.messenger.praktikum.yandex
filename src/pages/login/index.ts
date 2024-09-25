import Block from "../../framework/Block";
import templateLogin from "./login.hbs";
import { inputs, buttons } from "../../constants/login/login.constants";

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  console.log("Событие submit сработало!");
};

export class LoginPage extends Block {
  constructor() {
    super({
      buttons,
      inputs,
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }

  render() {
    return this.compile(templateLogin, this.props);
  }
}
