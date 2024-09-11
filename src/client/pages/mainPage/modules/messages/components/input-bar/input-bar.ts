import pinIcon from '../../../../../../../../static/assets/pinIcon.svg';
import arrowBtn from '../../../../../../../../static/assets/arrowBtn.svg';

const InputBar = `
  <div class="dialog__input-bar">
    <button class="input-bar__pin-button">
      <img src="${pinIcon}" alt="file">
    </button>
    <textarea name="message" class="dialog__input-bar__input" type="textarea" placeholder="Сообщение..."></textarea>
    <button class="input-bar__send-button">
      <img class="input-bar__send-icon" src="${arrowBtn}" alt="send">
    </button>
  </div>
`;

export default InputBar;