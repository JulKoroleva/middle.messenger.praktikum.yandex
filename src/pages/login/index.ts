import Block from "../../framework/Block";
import templateLogin from "./login.hbs";
import { createInputs, createButtons } from "../../constants/login/login.constants";
interface LoginPageProps {
  changePage: (page: string) => void;
}

const handleFormSubmit = (e: Event, changePage: (page: string) => void) => {
  e.preventDefault();
  changePage("mainPage");
};

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      buttons: createButtons(props.changePage),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e, props.changePage),
    });
  }

  render() {
    return this.compile(templateLogin, this.props);
  }
}
