import union from "../../../static/assets/union.svg";
import arrowBtn from "../../../static/assets/arrowBtn.svg";
import templateProfilePage from "./profile-page.hbs";
import Block from "../../framework/Block";
import {
  createButtons,
  createInputs,
} from "../../constants/profile/profile.constants";
import Button from "../../components/button/button";
import { validateForm } from "../../validators/form.validator";
import { User } from "../../utils/api/auth-api";
import Store, { withStore } from "../../framework/Store";
import { Routes } from "../../utils/Routes";
import Router from "../../framework/Router";
import UsersController from "../../controllers/edit-settings.controller";
import UserAuthController from "../../controllers/auth.controller";
import store from "../../framework/Store";

const avatarPath = "https://ya-praktikum.tech/api/v2/resources/";
class ProfilePage extends Block {
  constructor() {
    const state = Store.getState();

    const currentUserData = state.user || {};

    super({
      currentUserData: currentUserData,
      avatar: currentUserData.avatar
        ? `${avatarPath}${currentUserData.avatar}`
        : union,
      avatarChangeVisibility: "hidden",
      passwordChangeVisibility: "hidden",
      onAvatarChange: (e: Event) => this.handleChangeAvatar(e),
      onAvatarClick: () => this.handleAvatarClick(),
      onPasswordToggle: () => this.handleChangePasswordClick(),
    });

    this.props.isEditing = false;

    this.props.buttons = createButtons(
      this.toggleEditing.bind(this),
      this.handleChangePasswordClick.bind(this)
    );
    this.props.inputs = createInputs(currentUserData, this.props.isEditing);
    this.props.union = union;
    this.props.arrowBtn = arrowBtn;
    this.props.saveChanges = this.saveChanges.bind(this);

    this.props.onChangePage = (e: MouseEvent) => {
      e.preventDefault();
      Router.go(Routes.MainPage);
    };
  }

  toggleEditing() {
    this.setProps({ isEditing: !this.props.isEditing });
  }

  handleChangeAvatar = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const avatarInput = form.querySelector(
      'input[name="avatar"]'
    ) as HTMLInputElement;
    if (avatarInput && avatarInput.files?.length) {
      const avatarFile = avatarInput.files[0];

      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (avatarFile.size > MAX_FILE_SIZE) {
        // console.error("Размер файла слишком велик. Максимальный размер 5 МБ.");
        return;
      }

      await UsersController.updateUserAvatar(form);
      this.setProps({ avatarChangeVisibility: "hidden" });
    } else {
      // console.error("Файл для аватара не выбран");
    }
  };

  handleAvatarClick = () => {
    this.setProps({
      avatarChangeVisibility:
        this.props.avatarChangeVisibility === "visible" ? "hidden" : "visible",
    });
  };

  handleChangePasswordClick() {
    this.setProps({
      passwordChangeVisibility:
        this.props.passwordChangeVisibility === "visible"
          ? "hidden"
          : "visible",
    });
  }

  saveChanges(e: MouseEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formIsValid = validateForm(form);
    if (formIsValid) {
      const formData = new FormData(form);

      if (formData.get("oldPassword")) {
        UsersController.changePassword(form);

        this.setProps({
          inputs: createInputs(
            this.props.currentUserData,
            this.props.isEditing
          ),
        });

        this.setProps({
          buttons: createButtons(
            this.toggleEditing.bind(this),
            this.handleChangePasswordClick.bind(this)
          ),
        });
        this.setProps({ passwordChangeVisibility: "hidden" });
        this.setProps({ avatarChangeVisibility: "hidden" });
        return;
      }
      UsersController.updateUserInfo(form);
      this.setProps({
        inputs: createInputs(this.props.currentUserData, this.props.isEditing),
      });

      this.setProps({
        buttons: createButtons(
          this.toggleEditing.bind(this),
          this.handleChangePasswordClick.bind(this)
        ),
      });

      this.setProps({ isEditing: false });
    } else {
      throw new Error("Form is invalid");
    }
  }

  async init() {
    try {
      const userState = await UserAuthController.getUser();
      if (userState) {
        store.set("user", userState);
        this.setProps({ avatar: `${avatarPath}${userState.avatar}` });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  render() {
    const isEditing = this.props.isEditing;
    const buttons = isEditing
      ? [
          new Button({
            buttonText: "Сохранить изменения",
            buttonClass: "button_primary",
            buttonType: "submit",
          }),
        ]
      : this.props.buttons;

    const inputs = createInputs(this.props.currentUserData || {}, isEditing);

    return this.compile(templateProfilePage, {
      ...this.props,
      buttons,
      inputs,
      avatarChangeVisibility: this.props.avatarChangeVisibility,
    });
  }
}

const mapStateToProps = (state: { user: User }) => {
  return {
    currentUserData: state.user || {}, // Защита от отсутствия данных
  };
};

export default withStore(mapStateToProps)(ProfilePage);
