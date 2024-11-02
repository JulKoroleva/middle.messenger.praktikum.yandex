import { BaseApi } from "./base-api";
import { User } from "./auth-api";
import { ChatInfo } from "../../interfaces/chat.interface";

export class ChatsAPI extends BaseApi {
  constructor() {
    super("/chats");
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  read(): Promise<ChatInfo[]> {
    return this.http.get("/");
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { users: users, chatId: id });
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { users: users, chatId: id });
  }

  addChatAvatar(formData: FormData): Promise<unknown> {
    return this.http.put("/avatar", formData);
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(
      `/token/${id}`,
      {}
    );

    return response.token;
  }

  update = undefined;
  request = undefined;
}

export default new ChatsAPI();
