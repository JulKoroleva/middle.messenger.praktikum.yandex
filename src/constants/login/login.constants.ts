import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Router from "../../framework/Router";
import { Routes } from "../../utils/Routes";

export const createInputs = () => [
  new Input({
    inputName: "login",
    inputLabel: "Логин",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true,
  }),
  new Input({
    inputName: "password",
    inputLabel: "Пароль",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
    isEditing: true,
  }),
];

export const createButtons  = () => [
  new Button({
    buttonText: "Авторизоваться",
    buttonClass: "button_primary",
    buttonType: "submit",
  }),
  new Button({
    buttonText: "Нет аккаунта?",
    buttonClass: "button_text",
    buttonType: "button",
    onClick: (e: MouseEvent) => {
      e.preventDefault();      
      Router.go(Routes.Signup)
    },
  }),
];
