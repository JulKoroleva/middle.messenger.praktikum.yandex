import pinIcon from "../../../../../../../static/assets/pinIcon.svg";
import arrowBtn from "../../../../../../../static/assets/arrowBtn.svg";

import Block from "../../../../../../framework/Block";
import templateInputBar from "./input-bar.hbs";

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const message = form.message.value.trim(); // Извлечение значения из textarea с именем "message"

  if (message) {
    console.log('Отправленное сообщение:', message);
    form.reset(); // Очистить поле после отправки сообщения
  } else {
    console.error('Поле сообщения пустое');
    triggerShakeAnimation();
  }
}

function triggerShakeAnimation() {
  const submitButton = document.querySelector('.input-bar__send-button');
  const textArea = document.querySelector('.dialog__input-bar__input');
  
  if (submitButton && textArea) {
    submitButton.classList.add('shake');
    textArea.classList.add('shake'); // Добавление класса "shake" к textarea

    // Удаление класса "shake" после завершения анимации
    setTimeout(() => {
      submitButton.classList.remove('shake');
      textArea.classList.remove('shake'); // Удаление класса "shake" с textarea
    }, 300); // Время должно совпадать с продолжительностью анимации (0.3s)
  }
}

export default class InputBar extends Block {
  constructor() {
    super({
      pinIcon,
      arrowBtn,
      handleSubmit: (e: Event) => handleSubmit(e),
    });
  }

  render() {
    return this.compile(templateInputBar, this.props);
  }
}
