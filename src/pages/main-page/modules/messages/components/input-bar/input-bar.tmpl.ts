import pinIcon from "../../../../../../../static/assets/pinIcon.svg";
import arrowBtn from "../../../../../../../static/assets/arrowBtn.svg";

import Block from "../../../../../../framework/Block";
import templateInputBar from "./input-bar.hbs";
import messagesController from "../../../../../../controllers/message.controller";

function handleSendMessage(e: Event, block: Block) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const message = form.message.value.trim();

  if (message) {
    const selectedChat = block.getProps('selectedChat');
    
    if (selectedChat) {
      messagesController.sendMessage(selectedChat, message); // Отправляем сообщение через контроллер
      const chatWindow = document.querySelector('.conversation__messages-container');
      chatWindow?.scrollTo(0, chatWindow.scrollHeight); // Прокручиваем окно чата вниз
    }

    form.reset(); // Сбрасываем форму после отправки
  } else {
    triggerShakeAnimation(); // Анимация ошибки, если сообщение пустое
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
      handleSubmit: (e: Event) => handleSendMessage(e, this), // Передаем блок в handleSendMessage
    });
  }

  render() {
    return this.compile(templateInputBar, this.props);
  }
}
