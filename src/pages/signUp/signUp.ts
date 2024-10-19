import Block from "../../framework/Block";
import {
  createButtons,
  createInputs,
} from "../../constants/signup/signup.constants";
import templateSignup from "../signUp/signUp.hbs";
import UserAuthController from "../../controllers/auth.controller";

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  UserAuthController.signup(form);
};

export default class SignupPage extends Block {
  constructor() {
    super({
      buttons: createButtons(),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }

  render() {
    return this.compile(templateSignup, this.props);
  }
}
