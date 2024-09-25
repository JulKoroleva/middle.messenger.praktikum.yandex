
import renderTemplate from "../../utils/dom/render";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
export const inputs = [
  new Input({
    inputName: "email",
    inputLabel: "Почта",
    inputType: "email",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
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
    inputName: "first_name",
    inputLabel: "Имя",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
  new Input({
    inputName: "second_name",
    inputLabel: "Фамилия",
    inputType: "text",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
  new Input({
    inputName: "phone",
    inputLabel: "Телефон",
    inputType: "tel",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
  new Input({
    inputName: "password",
    inputLabel: "Пароль (еще раз)",
    inputType: "password",
    inputMainClass: "dynamic-input",
    inputClass: "dynamic-input__data",
    labelClass: "dynamic-input__placeholder",
    inputValue: "",
  }),
  new Input({
    inputName: "confirmPassword",
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
    buttonText: "Зарегистрироваться",
    buttonClass: "button_primary",
    buttonType: "submit",
  }),
  new Button({
    buttonText: "Войти",
    buttonClass: "button_text",
    buttonType: "button",
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      renderTemplate('login');
    },
  }),
];

