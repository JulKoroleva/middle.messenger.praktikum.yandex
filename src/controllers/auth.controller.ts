import authApi, { User } from "../utils/api/auth-api";
import Router from "../framework/Router";
import Store from "../framework/Store";
import { Routes } from "../utils/Routes";
import { validateForm } from "../validators/form.validator";
import showErrorModal from "../components/modal/showErrorModal";
import chatController from "./chat.controller";

class UserAuthController {
  public async login(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        showErrorModal(`Login data is invalid`);
        return;
      }

      const formData = new FormData(form);

      const data = {
        login: formData.get("login") as string,
        password: formData.get("password") as string,
      };

      await authApi
        .signin(data)
        .then(async () => {
          await this.getUser();
          await chatController.fetchChats();
          Router.go(Routes.MainPage);
        })
        .catch((error) => {
          if (error.reason === "User already in system") {
            Router.go(Routes.MainPage); // Редирект к чатам
          } else if (error.reason) {
            showErrorModal(error.reason);
          } else {
            showErrorModal("Неправильный логин или пароль");
          }
        });
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  public async signup(form: HTMLFormElement) {
    try {
      const formIsValid = validateForm(form);

      if (!formIsValid) {
        showErrorModal(`Signup data is invalid`);
        return;
      }

      const formData = new FormData(form);
      const data = {
        first_name: formData.get("first_name") as string,
        second_name: formData.get("second_name") as string,
        login: formData.get("login") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        password: formData.get("password") as string,
      };

      await authApi.signup(data)
      .then( async () => {
        await this.getUser();  
        Router.go(Routes.MainPage);
      })
      .catch((error) => {
        if (error.reason) {
          showErrorModal(error.reason);
        } else {
          showErrorModal("Некорректные данные: логин или email уже используются");
        }
      });
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async logout() {
    try {
      await authApi.logout();
      Store.set("user", "");
      Router.go("/");
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async getUser(): Promise<User | undefined> {
    try {
      const user = await authApi.getUser();
      Store.set("user", user);
      return user;
    } catch (e) {
      return undefined;
    }
  }
}

export default new UserAuthController();
