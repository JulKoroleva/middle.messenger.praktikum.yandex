import Block from "../../../../../../framework/Block";
import templateChatListHeader from "./chat-list-header.hbs";
import searchIcon from "../../../../../../../static/assets/searchIcon.svg";

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
        props.changePage("profile");
      },
    });
  }

  render() {
    return this.compile(templateChatListHeader, this.props);
  }
}
