import Block from "../../framework/Block";
import modal from "./modal.hbs";

interface ModalProps {
  style: string;
  visibility: string;
}
export default class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(modal, this.props);
  }
}
