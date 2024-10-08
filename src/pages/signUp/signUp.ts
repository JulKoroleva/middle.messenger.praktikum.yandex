import Block from "../../framework/Block";
import {
  createButtons,
  createInputs,
} from "../../constants/signup/signup.constants";
import { validateForm } from "../../validators/form.validator";
import templateSignup from "../signUp/signUp.hbs";

const handleFormSubmit = (e: Event, changePage: (page: string) => void) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries((formData as any).entries());
    console.log("formDataObject", formDataObject);

    changePage("mainPage");
  } else {
    throw new Error("Form is invalid");
  }
};

export default  class SignupPage extends Block {
  constructor(props: SignupPageProps) {
    super({
      ...props,
      buttons: createButtons(props.changePage),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e, props.changePage),
    });
  }

  render() {
    return this.compile(templateSignup, this.props);
  }
}
