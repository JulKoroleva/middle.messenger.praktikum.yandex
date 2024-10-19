import Block from "../../../../../../framework/Block";
import templateChatListHeader from "./chat-list-header.hbs";
import searchIcon from "../../../../../../../static/assets/searchIcon.svg";
import { Routes } from "../../../../../../utils/Routes";
import Router from "../../../../../../framework/Router";
import chatController from "../../../../../../controllers/chat.controller";

export default class ChatListHeader extends Block {
  constructor() {
    super({
      searchIcon: searchIcon,
      showChatPopup: "hidden",
      profileButton: {
        buttonText: "Профиль >",
        buttonClass: "button_link",
        buttonType: "button",
      },
      createChatButton: {
        buttonText: "Новый чат",
        buttonClass: "button_link",
        buttonType: "button",
      },
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        Router.go(Routes.Settings);
      },
      onOpenCreateChat: (e: MouseEvent) => {
        e.preventDefault();
        this.toggleCreateChatPopup();
      },
      handleChatCreate: (e: Event) => this.handleCreateChat(e),
      toggleChatCreate: () => this.toggleCreateChatPopup(),
    });
  }

  toggleCreateChatPopup() {
    const newPopupState =
      this.props.showChatPopup === "hidden" ? "visible" : "hidden";
    this.setProps({ showChatPopup: newPopupState });
  }

  handleCreateChat = (e: Event) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const title = form.get("title");

    chatController.create(title as string);
  };

  render() {
    return this.compile(templateChatListHeader, this.props);
  }
}
