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
    const selectedChatId = store.getState().selectedChat;
    const chats = store.getState().chats || [];
    const selectedChat = chats.find((chat: any) => chat.id === selectedChatId);

    const avatarUrl =
      selectedChat && selectedChat.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${selectedChat.avatar}`
        : union; 

    super({
      currentUserId: store.getState().user.id,
      ellipseIcon,
      onAvatarPopupClick: () => this.toggleAddChatAvatarPopup(this),
      avatarChangeVisibility: "hidden",
      chatOptionsVisibility: "hidden",
      onOptionsClick: () => this.handleOptionsClick(this),
      addUserPopupVisibility: "hidden",
      onAddUserPopupClick: () => this.toggleAddUserPopup(this),
      handleAddUser: (e: Event) => this.handleAddUser(e, this),
      deleteUserPopupVisibility: "hidden",
      onRemoveUserClick: () => this.toggleDeleteUserPopup(this),
      avatar: avatarUrl,
      chatName: selectedChat?.title,
      users: [],
      handleDeleteUser: (e: Event) => this.handleDeleteUser(e),
      handleSetChatAvatar: (e: Event) => this.handleSetChatAvatar(e),
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

  toggleAddChatAvatarPopup = (block: Block) => {
    this.loadUsers();
    block.setProps({
      avatarChangeVisibility:
        this.props.avatarChangeVisibility === "visible" ? "hidden" : "visible",
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
    const user = userList[0];
    await chatController.addUserToChat(chatId, user.id);
    block.setProps({ addUserPopupVisibility: "hidden" });
  };

  handleDeleteUser = (e: Event) => {
    const button = e.target as HTMLElement;
    const userIdString = button.getAttribute("data-user-id");

    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      const chatId = store.getState().selectedChat;

      chatController
        .deleteUserFromChat(chatId, userId)
        .then(() => this.loadUsers())
        .catch(() => showErrorModal(`Ошибка при удалении пользователя`));
    }
  };

  handleSetChatAvatar = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector(
      'input[name="avatar"]'
    ) as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) {
      showErrorModal("Файл не выбран.");
      return;
    }

    const chatId = store.getState().selectedChat;
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("chatId", chatId.toString());

    console.log("Проверка formData перед отправкой", formData);

    try {
      await chatController.addChatAvatar(chatId, formData);

      await chatController.fetchChats();

      this.updateChatAvatar();
      this.setProps({ avatarChangeVisibility: "hidden" });
      console.log("Аватар успешно загружен.");
    } catch (error) {
      showErrorModal(`Ошибка при изменении аватара: ${JSON.stringify(error)}`);
    }
  };

  updateChatAvatar() {
    const chatId = store.getState().selectedChat;
    const chats = store.getState().chats;
    const selectedChat = chats.find((chat: any) => chat.id === chatId);

    if (selectedChat && selectedChat.avatar) {
      this.setProps({
        avatar: `https://ya-praktikum.tech/api/v2/resources${selectedChat.avatar}`,
      });
    }
  }

  render() {
    return this.compile(templateDialogHeader, this.props);
  }
  componentDidMount() {
    this.loadUsers();
  }
}
