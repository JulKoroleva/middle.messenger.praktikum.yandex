import Block from "../../framework/Block";
import template from './form.hbs';

interface FormProps {
  onSubmit?: (e: Event) => void;
  class?: string;
  events?: {
    submit?: (e: Event) => void;
  };
}

export default class Form extends Block {
  constructor(props: FormProps) {
    super({ 
      ...props,
      events: {
        submit: (e: Event) => {
          console.log('hi')
          e.preventDefault();
          console.log("Событие submit вызвано");
          props.onSubmit?.(e);
        }
      }
    });
  }

  render() {
    console.log("Рендеринг формы с пропсами:", this.props);
    return this.compile(template, this.props);
  }
}

