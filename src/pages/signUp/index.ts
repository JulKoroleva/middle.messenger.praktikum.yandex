import templateSignup from './signup.hbs';
import Block from '../../framework/Block';
import { inputs, buttons } from '../../constants/login/login.constants';
import { validateForm } from '../../validators/form.validator';
import { renderTemplate } from '../../utils/dom/render';

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
      inputs,
      buttons,
    })
  }

  // render() {
  //   return this.compile(templateSignup, this.props).firstElementChild?.outerHTML ||
  //   "";
  // }
}