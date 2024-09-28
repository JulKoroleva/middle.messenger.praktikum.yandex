import Block from "../../framework/Block";
import template from './form.hbs';

export default class Form extends Block {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
