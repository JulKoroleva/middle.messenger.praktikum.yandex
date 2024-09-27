import templateSignup from './signup.hbs';
import Block from '../../framework/Block';
import { createButtons, createInputs } from '../../constants/signup/signup.constants';
// import { validateForm } from '../../validators/form.validator';
interface SignupPageProps {
  changePage: (page: string) => void;
}

const handleFormSubmit = (e: Event, changePage: (page: string) => void) => {
  e.preventDefault();
  changePage('mainPage');
};

export class SignupPage extends Block {
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
