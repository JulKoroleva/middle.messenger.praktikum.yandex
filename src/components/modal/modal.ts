import Block from "../../framework/Block.ts";
import modal from "./modal.hbs";

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
