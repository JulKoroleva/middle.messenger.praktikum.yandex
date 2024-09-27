
import Block from "../../framework/Block";
import templateErrorPage from "./error-page.hbs";

interface ErrorPageProps {
  errorCode: string,
  description: string,
  changePage: (page: string) => void;
}

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      onButtonClick: (e: Event) => {
        e.preventDefault()
        props.changePage('mainPage');
      },
    });
  }

  render() {
    return this.compile(templateErrorPage, this.props);
  }
}
