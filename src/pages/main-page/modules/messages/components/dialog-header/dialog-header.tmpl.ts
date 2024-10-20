import Block from "../../../../../../framework/Block";
import templateDialogHeader from "./dialog-header.hbs";
import ellipseIcon from "../../../../../../../static/assets/ellipseIcon.svg";
import { User } from "../../../../../../utils/api/auth-api";
import chatController from "../../../../../../controllers/chat.controller";
import usersController from "../../../../../../controllers/edit-settings.controller";
import store from "../../../../../../framework/Store";
import union from "../../../../../../../static/assets/union.svg";
import showErrorModal from "../../../../../../components/modal/showErrorModal";

export default class DialogHeader extends Block {
  constructor() {
    super({
      currentUserId: store.getState().user.id,
      ellipseIcon,
      chatOptionsVisibility: "hidden",
      onOptionsClick: () => this.handleOptionsClick(this),
      addUserPopupVisibility: "hidden",
      onAddUserPopupClick: () => this.toggleAddUserPopup(this),
      handleAddUser: (e: Event) => this.handleAddUser(e, this),
      deleteUserPopupVisibility: "hidden",
      onRemoveUserClick: () => this.toggleDeleteUserPopup(this),
      avatar: union,
      users: [],
      handleDeleteUser: (e: Event) => this.handleDeleteUser(e),
    });
  }

  async loadUsers() {
    const chatId = store.getState().selectedChat;
    const users = await chatController.getUsers(chatId);
    this.setProps({ users });

    this.bindDeleteUserButtons();
  }

  bindDeleteUserButtons() {
    const deleteButtons = document.querySelectorAll(".button_delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", this.handleDeleteUser);
    });
  }

  handleOptionsClick = (block: Block) => {
    block.setProps({
      chatOptionsVisibility:
        this.props.chatOptionsVisibility === "visible" ? "hidden" : "visible",
    });
  };

  toggleDeleteUserPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      deleteUserPopupVisibility:
        this.props.deleteUserPopupVisibility === "visible"
          ? "hidden"
          : "visible",
    });
    this.handleOptionsClick(block);
  };

  toggleAddUserPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      addUserPopupVisibility:
        this.props.addUserPopupVisibility === "visible" ? "hidden" : "visible",
    });
    this.handleOptionsClick(block);
  };

  handleAddUser = async (e: Event, block: Block) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const chatId = store.getState().selectedChat;
    const userList: User[] = await usersController.searchUsers(
      formData.get("login") as string
    );
    console.log("userList", userList);
    const user = userList[0];
    console.log("user", user);
    await chatController.addUserToChat(chatId, user.id);
    block.setProps({ addUserPopupVisibility: "hidden" });
  };
  handleDeleteUser = (e: Event) => {
    console.log("handleDeleteUser");
    const button = e.target as HTMLElement;
    const userIdString = button.getAttribute("data-user-id");

    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      const chatId = store.getState().selectedChat;

      chatController
        .deleteUserFromChat(chatId, userId)
        .then(() => this.loadUsers())
        .catch(() =>
          showErrorModal(`Ошибка при удалении пользователя`)
        );
    }
  };
  render() {
    return this.compile(templateDialogHeader, this.props);
  }
  componentDidMount() {
    this.loadUsers();
  }
}
