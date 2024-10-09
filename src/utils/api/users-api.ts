import { BaseApi } from "./base-api";
import { User } from "./auth-api";

export interface LoginData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ChangePassword {
  oldPassword: string,
  newPassword: string,
}

export interface UserInfoToUpdate {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

class UsersApi extends BaseApi {
  constructor() {
    super('/user')
  }
  update(data: UserInfoToUpdate): Promise<User> {
    return this.http.put('/profile', data)
  }

  updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data)
  }

  changePassword(data: ChangePassword) {
    return this.http.put('/password', data)
  }

  getUser(): Promise<User> {
    return this.http.get('/user')
  }

  searchUsers(login: string): Promise<User[]> {
    return this.http.post('/search', {login: login})
  }

  logout() {
    return this.http.post('/logout', {});
  }
  create = undefined;
  delete = undefined;
  request = undefined;
}

export default new UsersApi();
