import Button from "../../components/button/button";
import Input from "../../components/input/input";

export const createInputs = (userData: UserInfo, isEditing: boolean) => {
  return [
    new Input({
      inputName: "email",
      inputLabel: "Почта",
      inputType: "email",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.email,
      isEditing: isEditing,
    }),
    new Input({
      inputName: "login",
      inputLabel: "Логин",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.login,
      isEditing: isEditing,
    }),
    new Input({
      inputName: "first_name",
      inputLabel: "Имя",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.first_name,
      isEditing: isEditing,
    }),
    new Input({
      inputName: "second_name",
      inputLabel: "Фамилия",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.second_name,
      isEditing: isEditing,
    }),
    new Input({
      inputName: "display_name",
      inputLabel: "Имя в чате",
      inputType: "text",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.display_name,
      isEditing: isEditing,
    }),
    new Input({
      inputName: "phone",
      inputLabel: "Телефон",
      inputType: "tel",
      inputMainClass: "line-input",
      inputClass: "line-input__data",
      labelClass: "line-input__placeholder",
      inputValue: userData.phone,
      isEditing: isEditing,
    }),
  ];
};

export const createButtons = (
  changePage: (page: string) => void,
  toggleEditing: () => void
) => [
  new Button({
    buttonText: "Изменить данные",
    buttonClass: "button_text button_border",
    buttonType: "button",
    onClick: toggleEditing,
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
      changePage("login");
    },
  }),
];
