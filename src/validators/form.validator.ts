type ValidationRule = {
  regex: RegExp;
  errorMessage: string;
};

type ValidationRules = {
  [key: string]: ValidationRule;
};

const validationRules: ValidationRules = {
  first_name: {
    regex: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage:
      "Имя должно начинаться с заглавной буквы, содержать только буквы или дефис, и не должно содержать пробелы, цифры или специальные символы",
  },
  second_name: {
    regex: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage:
      "Фамилия должна начинаться с заглавной буквы, содержать только буквы или дефис, и не должна содержать пробелы, цифры или специальные символы",
  },
  display_name: {
    regex: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage:
      "Отображаемое имя должно начинаться с буквы и содержать только буквы или дефис, без пробелов или спецсимволов",
  },
  login: {
    regex: /^(?!-|\d)[A-Za-z0-9_-]{3,20}(?<!-)$/,
    errorMessage:
      "Логин должен быть от 3 до 20 символов. Допустимые символы: a-zA-Z, 0-9, -, _",
  },
  email: {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    errorMessage:
      "Введите корректный адрес электронной почты в формате example@domain.com",
  },
  password: {
    regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage:
      "Пароль должен быть длиной от 8 до 40 символов, содержать хотя бы одну заглавную букву и хотя бы одну цифру",
  },
  confirmPassword: {
    regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    errorMessage: "Повторите пароль",
  },
  phone: {
    regex: /^\+?\d{10,15}$/,
    errorMessage: "Номер телефона должен содержать от 10 до 15 цифр",
  },
  message: {
    regex: /^.+$/,
    errorMessage: "Сообщение не должно быть пустым",
  },
};

const getErrorMessage = (inputName: string): string =>
  validationRules[inputName]?.errorMessage || "Поле заполнено некорректно";

export  const validateInput = (
  input: HTMLInputElement | HTMLTextAreaElement
): boolean => {
  const errorSpan = document.getElementById(`${input.name}-error`) as HTMLElement;
  const validationRule = validationRules[input.name];
  const inputWrapper = input.closest('.dynamic-input') as HTMLElement;

  if (validationRule && !validationRule.regex.test(input.value)) {
    if (errorSpan) {
      errorSpan.classList.add("input__error_visible");
      errorSpan.textContent = getErrorMessage(input.name);
    }

    if (inputWrapper) {
      inputWrapper.classList.add('error');
    }
    return false;
  } else {
    if (errorSpan) {
      errorSpan.classList.remove("input__error_visible");
      errorSpan.textContent = "";
    }
    if (inputWrapper) {
      inputWrapper.classList.remove('error');
    }
    return true;
  }
};

export const validateForm = (form: HTMLFormElement): boolean => {
  const inputs = Array.from(form.querySelectorAll("input, textarea"));
  let formIsValid = true;

  inputs.forEach((input) => {
    if (!validateInput(input as HTMLInputElement | HTMLTextAreaElement)) {
      formIsValid = false;
    }
  });

  return formIsValid;
};

export const initializeValidationListeners = (form: HTMLFormElement): void => {
  const inputs = Array.from(form.querySelectorAll("input, textarea"));

  inputs.forEach((input) => {
    // Приведение типа к HTMLInputElement
    const typedInput = input as HTMLInputElement;

    typedInput.addEventListener("input", () => validateInput(typedInput));

    // Добавление обработчика события focusout
    typedInput.addEventListener("focusout", () => {
      // Если инпут не заполнен, то вызываем валидацию
      if (typedInput.value.trim() === "") {
        validateInput(typedInput);
      }
    });
  });
};
