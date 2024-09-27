import pinIcon from "../../../../../../../static/assets/pinIcon.svg";
import arrowBtn from "../../../../../../../static/assets/arrowBtn.svg";

import Block from "../../../../../../framework/Block";
import templateInputBar from "./input-bar.hbs";

// export default MessageItem;

export default class InputBar extends Block {
  constructor() {
    super({
      pinIcon,
      arrowBtn
    });
  }

  render() {
    return this.compile(templateInputBar, this.props);
  }
}
