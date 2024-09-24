import Block from '../../framework/Block';
import templateLogin from './login.hbs'
import { inputs, buttons } from '../../constants/login/login.constants';
import { validateForm } from '../../validators/form.validator';

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

  render() {
    return `
    <div class="app">
        {{{ Footer }}}
    </div>`;
  }
}