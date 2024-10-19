import Block from "../../framework/Block";
import {
  createInputs,
  createButtons,
} from "../../constants/login/login.constants";
import { initializeValidationListeners } from "../../validators/form.validator";
import templateLogin from "../login/login.hbs";
import UserAuthController from "../../controllers/auth.controller";

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  UserAuthController.login(form);
};

export default class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      buttons: createButtons(props.changePage),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }

  componentDidMount() {
    const form = this.getContent() as HTMLFormElement;
    initializeValidationListeners(form);
  }

  render() {
    return this.compile(templateLogin, this.props);
  }
}
