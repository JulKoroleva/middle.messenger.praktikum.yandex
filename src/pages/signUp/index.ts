import templateSignup from './signup.hbs';
import Block from '../../framework/Block';
import { inputs, buttons } from '../../constants/signup/signup.constants';
// import { validateForm } from '../../validators/form.validator';

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
};

export class SignupPage extends Block {
  constructor() {
    super({ 
      buttons,
      inputs,
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    });
  }
  

  render() {
    return this.compile(templateSignup, this.props);
  }
}
