import { renderTemplate } from "../../utils/dom/render";

export const inputs = [
  {
    inputName: "login",
    inputLabel: "Логин",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
  },
  {
    inputName: "password",
    inputLabel: "Пароль",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
  },
];

export const buttons = [
  {
    buttonText: "Авторизоваться",
    buttonClass: "button_primary",
    buttonLink: "/chats",
    onClick: (event: Event) => {
      console.log("CLICK");
      event.preventDefault();
      event.stopPropagation();
    },
  },
  {
    buttonText: "Нет аккаунта?",
    buttonClass: "button_text",
    buttonLink: "/signup",
    onClick: (event: Event) => {
      console.log("CLICK");
      event.preventDefault();
      event.stopPropagation();
    },
  },
];
