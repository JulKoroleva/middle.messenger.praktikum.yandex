import Block from "../../framework/Block";
import template from './form.hbs';

interface FormProps {
  onSubmit: () => void
  events: {
    submit: () => void
  }
}
export default class Form extends Block {
  constructor(props: FormProps) {
    console.log("props",props);
    console.log("props.onSubmit",props.onSubmit);
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
