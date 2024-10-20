import resourcesApi from "../utils/api/resources-api";
import usersApi from "../utils/api/users-api";
import { validateForm } from "../validators/form.validator";
import { User } from "../utils/api/auth-api";
import store from "../framework/Store";
import showErrorModal from "../components/modal/showErrorModal";

class UsersController {
  public async updateUserInfo(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        throw new Error("User data is invalid to update");
      }

      const formData = new FormData(form);
      const data = {
        first_name: formData.get("first_name") as string,
        second_name: formData.get("second_name") as string,
        login: formData.get("login") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        display_name: formData.get("display_name") as string,
      };

      const user = await usersApi.update(data);
      store.set("user", user);
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  public async updateUserAvatar(form: HTMLFormElement) {
    try {
      const formData = new FormData(form);

      const response = await usersApi.updateAvatar(formData) as User;
      if (response) {
        if (response && response.avatar) {
          store.set("user.avatar", response.avatar);
        }
      }
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  public async getUserAvatar(id: string) {
    try {
      const avatarPath = await resourcesApi.getAvatar(id);
      store.set("user.avatar", avatarPath);
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  public async changePassword(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        throw new Error("password data is invalid to update");
      }

      const formData = new FormData(form);
      const data = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
      };

      await usersApi.changePassword(data);
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  public async searchUsers(login: string): Promise<User[]> {
    try {
      const res = await usersApi.searchUsers(login);
      return res;
    } catch (e) {
      showErrorModal(`${e}`);
      throw e;
    }
  }
}

export default new UsersController();
