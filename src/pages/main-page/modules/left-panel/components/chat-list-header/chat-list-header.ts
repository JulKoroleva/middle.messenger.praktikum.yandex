import Block from "../../../../../../framework/Block";
import templateChatListHeader from "./chat-list-header.hbs";
import searchIcon from "../../../../../../../static/assets/searchIcon.svg";
import { Routes } from "../../../../../../utils/Routes";
import Router from "../../../../../../framework/Router";

export default class ChatListHeader extends Block {
  constructor(props: PropsChatListHeader) {
    super({
      searchIcon: searchIcon,
      button: {
        buttonText: "Профиль >",
        buttonClass: "button_link",
        buttonType: "button",
      },
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        Router.go(Routes.Settings)
      },
    });
  }

  render() {
    return this.compile(templateChatListHeader, this.props);
  }
}
