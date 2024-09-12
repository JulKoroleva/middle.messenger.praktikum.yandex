import pinIcon from "../../../../../../../../static/assets/pinIcon.svg";
import arrowBtn from "../../../../../../../../static/assets/arrowBtn.svg";

const InputBar = `
  <div class="dialog__input-bar">
    {{> Button buttonImage="${pinIcon}" buttonClass="input-bar__pin-button" imageAlt="file"}}
    <textarea name="message" class="dialog__input-bar__input" type="textarea" placeholder="Сообщение..."></textarea>
    {{> Button buttonImage="${arrowBtn}" buttonClass="input-bar__send-button" buttonImageClass="input-bar__send-icon" imageAlt="send"}}
  </div>
`;

export default InputBar;
