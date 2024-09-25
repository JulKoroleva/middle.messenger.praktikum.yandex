import Block from "../../framework/Block";
import templateLogin from "./login.hbs";
import { inputs, buttons } from "../../constants/login/login.constants";
import { validateForm } from "../../validators/form.validator";
import Button from "../../components/button/button";
import Input from "../../components/input/input";

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  const formIsValid = validateForm(form);
  if (formIsValid) {
    const formData = new FormData(form);
    console.log(formData);
    // console.log(Object.fromEntries(formData))
    // renderTemplate('chat');
  } else {
    console.log("Form is invalid");
  }
};

export class LoginPage extends Block {
  constructor() {
    const inputs = [
      new Input({
        inputName: "login",
        inputLabel: "Логин",
        inputType: "text",
        inputMainClass: "dynamic-input",
        inputClass: "dynamic-input__data",
        labelClass: "dynamic-input__placeholder",
      }),
      new Input({
        inputName: "password",
        inputLabel: "Пароль",
        inputType: "password",
        inputMainClass: "dynamic-input",
        inputClass: "dynamic-input__data",
        labelClass: "dynamic-input__placeholder",
      }),
    ];
  
    const buttons = [
      new Button({
        buttonText: "Авторизоваться",
        buttonClass: "button_primary",
        buttonLink: "/chats",
        onClick: (event: Event) => {
          console.log("CLICK");
          event.preventDefault();
          event.stopPropagation();
        },
      }),
      new Button({
        buttonText: "Нет аккаунта?",
        buttonClass: "button_text",
        buttonLink: "/signup",
        onClick: (event: Event) => {
          console.log("CLICK");
          event.preventDefault();
          event.stopPropagation();
        },
      }),
    ];
  
    super({
      buttons,
      inputs,
      events: {},
    });
  }
  

  render() {
    return this.compile(templateLogin, this.props);
  }
}
