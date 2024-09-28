import pinIcon from "../../../../../../../static/assets/pinIcon.svg";
import arrowBtn from "../../../../../../../static/assets/arrowBtn.svg";

import Block from "../../../../../../framework/Block";
import templateInputBar from "./input-bar.hbs";

function handleSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const message = form.message.value.trim();

  if (message) {
    console.log('Отправленное сообщение:', message);
    form.reset();
  } else {
    triggerShakeAnimation();
    throw new Error('Поле сообщения пустое');
  }
}

function triggerShakeAnimation() {
  const submitButton = document.querySelector('.input-bar__send-button');
  const textArea = document.querySelector('.dialog__input-bar__input');
  
  if (submitButton && textArea) {
    submitButton.classList.add('shake');
    textArea.classList.add('shake');

    setTimeout(() => {
      submitButton.classList.remove('shake');
      textArea.classList.remove('shake');
    }, 300);
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
