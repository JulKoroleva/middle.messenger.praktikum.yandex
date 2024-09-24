import Handlebars from 'handlebars';
import Block from '../../framework/block';
import templateLogin from './login.hbs'
import { inputs, buttons } from '../../constants/login/login.constants';
import { validateForm } from '../../validators/form.validator';
import { renderTemplate } from '../../utils/dom/render';

const template = Handlebars.compile(templateLogin);
const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    console.log(formData)
    // console.log(Object.fromEntries(formData))
    // renderTemplate('chat');
  } else {
    console.log('Form is invalid');
  }
};

export class LoginPage extends Block {
  constructor() {
    super({
      inputs,
      buttons,
      onSubmitForm: (e: Event) => handleFormSubmit(e),
    })
  }

  renderTemplate() {
    return this.compile(template, this.props)
  }
}