import ellipseIcon from "../../../../../../../static/assets/ellipseIcon.svg";

import Block from "../../../../../../framework/Block";
import templateDialogHeader from "./dialog-header.hbs";

// export default MessageItem;

interface PropsDialogHeader {
  avatar: string;
  chatName: string;
}

export default class DialogHeader extends Block {
  constructor(props: PropsDialogHeader) {
    super({
      ...props,
      ellipseIcon
    });
  }

  render() {
    return this.compile(templateDialogHeader, this.props);
  }
}
