import templateSignup from './signup.hbs';
import Block from '../../framework/Block';
import { inputs, buttons } from '../../constants/login/login.constants';
import { validateForm } from '../../validators/form.validator';

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    // console.log(Object.fromEntries(formData))
    // setTimeout(() => renderTemplate('signup'), 1500);
  } else {
    console.log('form is invalid');
  }
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
