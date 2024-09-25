import Block from "../../framework/Block";
import Form from "../../components/form/form";
import templateLogin from "./login.hbs";
import { inputs, buttons } from "../../constants/login/login.constants";
import { validateForm } from "../../validators/form.validator";
import renderTemplate from "../../utils/dom/render";

const handleFormSubmit = (e: Event) => {
  console.log("!!!!");
  const form = e.target as HTMLFormElement;

  // const formIsValid = validateForm(form);
  const formIsValid = true;
  if (formIsValid) {
    const formData = new FormData(form);
    console.log(formData);
    // console.log(Object.fromEntries(formData))
    renderTemplate("signup");
  } else {
    console.log("Form is invalid");
    // renderTemplate("signup");
  }
};

export class LoginPage extends Block {
  constructor() {
    super({
      buttons,
      inputs,
      onSubmitForm: handleFormSubmit,
    });
  }

  render() {
    return this.compile(templateLogin, this.props);
  }
}
