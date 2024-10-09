import Block from "../../framework/Block";
import Router from "../../framework/Router";
import { Routes } from "../../utils/Routes";
import templateErrorPage from "./error-page.hbs";

export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      onButtonClick: (e: Event) => {
        e.preventDefault();
        Router.go(Routes.MainPage)
      },
    });
  }

  render() {
    return this.compile(templateErrorPage, this.props);
  }
}
