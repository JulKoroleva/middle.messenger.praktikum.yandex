import templateSignup from './signup.hbs';
import Block from '../../framework/block';
import { inputs, buttons } from '../../constants/login/login.constants';
import { validateForm } from '../../validators/form.validator';
import { renderTemplate } from '../../utils/dom/render';

const template = Handlebars.compile(templateSignup);
const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    // console.log(Object.fromEntries(formData))
    setTimeout(() => renderTemplate('login'), 1500);
  } else {
    console.log('form is invalid');
  }
};

export class SignupPage extends Block {
  constructor() {
    super({
      inputs,
      buttons,
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    })
  }

  renderTemplate() {
    return this.compile(template, this.props);
  }
}