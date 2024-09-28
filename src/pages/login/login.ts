import Block from "../../framework/Block";
import templateLogin from "./login.hbs";
import { createInputs, createButtons } from "../../constants/login/login.constants";
import { initializeValidationListeners, validateForm } from "../../validators/form.validator";

const handleFormSubmit = (e: Event, changePage: (page: string) => void) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries((formData as any).entries());
    console.log('formDataObject', formDataObject)
    
    changePage("mainPage");
  } else {
    throw new Error('Form is invalid')
  }
};

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      buttons: createButtons(props.changePage),
      inputs: createInputs(),
      onSubmitForm: (e: Event) => handleFormSubmit(e, props.changePage),
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
