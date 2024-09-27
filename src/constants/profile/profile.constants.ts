import Button from "../../components/button/button";
import Input from "../../components/input/input";

export const createInputs = (userData: UserInfo) => [
    new Input({
      inputName: "email",
      inputLabel: "Почта",
      inputType: "email",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.email || "",
    }),
    new Input({
      inputName: "login",
      inputLabel: "Логин",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.login || "",
    }),
    new Input({
      inputName: "first_name",
      inputLabel: "Имя",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.first_name || "",
    }),
    new Input({
      inputName: "second_name",
      inputLabel: "Фамилия",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.second_name || "",
    }),
    new Input({
      inputName: "display_name",
      inputLabel: "Имя в чате",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.display_name || "",
    }),
    new Input({
      inputName: "phone",
      inputLabel: "Телефон",
      inputType: "tel",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.phone || "",
    }),
  ];
  
  export const createButtons = (changePage: (page: string) => void) => [
    new Button({
      buttonText: "Изменить данные",
      buttonClass: "button_text button_border",
      buttonType: "button",
    }),
    new Button({
      buttonText: "Изменить пароль",
      buttonClass: "button_text button_border",
      buttonType: "button",
    }),
    new Button({
      buttonText: "Выйти",
      buttonClass: "button_danger button_border",
      buttonType: "button",
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        changePage('login');
      },
    }),
  ];
  