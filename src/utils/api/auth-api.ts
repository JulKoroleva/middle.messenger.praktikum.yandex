import { BaseApi } from "./base-api";

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

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  [key: string]: string | number
}

class AuthApi extends BaseApi {
  constructor() {
    super('/auth')
  }
  signin(data: LoginData) {
    return this.http.post('/signin', data)
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { ...data })
  }

  getUser(): Promise<User> {
    console.log('this.http.get(user)')
    return this.http.get('/user')
  }

  logout() {
    return this.http.post('/logout', {});
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  request = undefined;
}

export default new AuthApi();
