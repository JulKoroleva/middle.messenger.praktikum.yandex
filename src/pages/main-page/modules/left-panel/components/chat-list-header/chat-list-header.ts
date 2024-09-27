import Block from "../../../../../../framework/Block";
import templateChatListHeader from "./chat-list-header.hbs";
import searchIcon from "../../../../../../../static/assets/searchIcon.svg";

interface PropsChatListHeader {
  changePage: (page: string) => void;
}
export default class ChatListHeader extends Block {
  constructor(props: PropsChatListHeader) {
    super({
      searchIcon: searchIcon,
      button: {
        buttonText: "Профиль >",
        buttonClass: "button_link",
        buttonType: "button"
      },
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        console.log("ChatListHeader", props);
        props.changePage("profile");
      },

    });
  }

  render() {
    console.log("ChatListHeader", this.props);
    return this.compile(templateChatListHeader, this.props);
  }
}
