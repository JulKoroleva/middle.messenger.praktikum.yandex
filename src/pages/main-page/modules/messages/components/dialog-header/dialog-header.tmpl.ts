import Block from "../../../../../../framework/Block";
import templateDialogHeader from "./dialog-header.hbs";
import ellipseIcon from "../../../../../../../static/assets/ellipseIcon.svg";
import { User } from "../../../../../../utils/api/auth-api";
import chatController from "../../../../../../controllers/chat.controller";
import usersController from "../../../../../../controllers/edit-settings.controller";
import store from "../../../../../../framework/Store";

export default class DialogHeader extends Block {
  constructor() {
    super({
      ellipseIcon,
      chatOptionsVisibility: "hidden",
      onOptionsClick: () => this.handleOptionsClick(this),
      addUserPopupVisibility: "hidden",
      onAddUserPopupClick: () => this.toggleAddUserPopup(this),
      handleAddUser: (e: Event) => this.handleAddUser(e, this),
      deleteUserPopupVisibility: "hidden",
      onRemoveUserClick: () => this.toggleDeleteUserPopup(this),
      handleDeleteUser: (e: Event) => this.handleDeleteUser(e, this),
    });
  }

  handleOptionsClick = (block: Block) => {
    block.setProps({
      chatOptionsVisibility:
        this.props.chatOptionsVisibility === "visible" ? "hidden" : "visible",
    });
  };

  toggleDeleteUserPopup = (block: Block) => {
    console.log("toggleDeleteUserPopup");
    block.setProps({
      deleteUserPopupVisibility:
        this.props.deleteUserPopupVisibility === "visible"
          ? "hidden"
          : "visible",
    });
  };

  toggleAddUserPopup = (block: Block) => {
    console.log("toggleAddUserPopup");
    block.setProps({
      addUserPopupVisibility:
        this.props.addUserPopupVisibility === "visible" ? "hidden" : "visible",
    });
  };

  handleAddUser = async (e: Event, block: Block) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const chatId = store.getState().selectedChat;
    const userList: User[] = await usersController.searchUsers(
      formData.get("login") as string
    );
    const user = userList[0];

    chatController.addUserToChat(chatId, user.id);

    block.setProps({ addUserPopupVisibility: "hidden" });
  };

  handleDeleteUser = async (e: Event, block: Block) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    block.setProps({ deleteUserPopup: "hidden" });
    const chatId = store.getState().selectedChat;

    const userList: User[] = await usersController.searchUsers(
      formData.get("login") as string
    );
    const user = userList[0];

    chatController.deleteUserFromChat(chatId, user.id);

    block.setProps({ deleteUserPopupVisibility: "hidden" });
  };
  
  render() {
    return this.compile(templateDialogHeader, this.props);
  }
}
