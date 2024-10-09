import Block from "../../../../../../framework/Block";
import templateDialogHeader from "./dialog-header.hbs";
import ellipseIcon from "../../../../../../../static/assets/ellipseIcon.svg";

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
