
import Block from '../../framework/Block';
import template from './popup.hbs';

interface PopupProps {
  onClick: () => void
  events: {
    click: () => void
  }
}

export default class Popup extends Block{
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}
