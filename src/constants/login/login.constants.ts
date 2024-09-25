
import renderTemplate from "../../utils/dom/render";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
export const inputs = [
  new Input({
    inputName: "login",
    inputLabel: "Логин",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
  new Input({
    inputName: "password",
    inputLabel: "Пароль",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
];

export const buttons = [
  new Button({
    buttonText: "Авторизоваться",
    buttonClass: "button_primary",
    buttonType: "submit",
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      const form = document.querySelector('.login-page__form');
      console.log('Обработчики событий формы:', form);
      
    },
  }),
  new Button({
    buttonText: "Нет аккаунта?",
    buttonClass: "button_text",
    buttonType: "button",
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      renderTemplate('signup');
    },
  }),
];

