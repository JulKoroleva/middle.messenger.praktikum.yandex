import ellipseIcon from "../../../../../../../static/assets/ellipseIcon.svg";

import Block from "../../../../../../framework/Block";
import templateDialogHeader from "./dialog-header.hbs";

// export default MessageItem;

interface PropsDialogHeader {
  avatar: string;
  chatName: string;
  changePage: (page: string) => void;
}

export default class DialogHeader extends Block {
  constructor(props: PropsDialogHeader) {
    super({
      ...props,
      ellipseIcon,
      onSettingsClick: (e: Event) => {
        e.preventDefault();
        props.changePage("");
      },
    });
  }

  render() {
    return this.compile(templateDialogHeader, this.props);
  }
}
