import Block from "../../framework/Block";
import templateErrorPage from "./error-page.hbs";

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      onButtonClick: (e: Event) => {
        e.preventDefault();
        props.changePage("mainPage");
      },
    });
  }

  render() {
    return this.compile(templateErrorPage, this.props);
  }
}
