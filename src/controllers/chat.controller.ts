import API, { ChatsAPI } from "../utils/api/chat-api";
import MessagesController from "../controllers/message.controller";
import store from "../framework/Store";
import showErrorModal from "../components/modal/showErrorModal";
import { User } from "../utils/api/auth-api";

class ChatsController {
  private readonly api: ChatsAPI;
  private sockets: Map<number, WebSocket>;

  constructor() {
    this.api = API;
    this.sockets = new Map();
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      if (Array.isArray(chats)) {
        chats.map(async (chat) => {
          const token = await this.getToken(chat.id);

          if (token) {
            await MessagesController.connect(chat.id, token);
            await this.fetchLastMessage(chat.id);
          }
        });

        store.set("chats", chats);
        console.log("chats", chats);
      }
    } catch (e) {
      // showErrorModal(`${e}`);
    }
  }

  async fetchLastMessage(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "get old", content: "1" }));
      } else {
        // console.error("WebSocket is not open, current state:", socket.readyState);
      }
    } catch (e) {
      // showErrorModal(`${e}`);
    }
  }

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async deleteUserFromChat(id: number, userId: number): Promise<void> {
    try {
      await this.api.deleteUsers(id, [userId]);
    } catch (e) {
      showErrorModal(`${e}`);
      throw new Error(`Ошибка при удалении пользователя из чата: ${e}`);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async getToken(id: number): Promise<string | undefined> {
    try {
      const token = await this.api.getToken(id);
      return token;
    } catch (e) {
      // console.error('Failed to get token for chat', e);
      return undefined;
    }
  }

  selectChat(id: number) {
    const messagesState = store.getState().messages || {};

    if (!messagesState[id]) {
      messagesState[id] = [];
      store.set("messages", messagesState);
    }

    store.set("selectedChat", id);
    MessagesController.fetchOldMessages(id);
  }

  async getUsers(chatId: number): Promise<User[]> {
    try {
      const users = await this.api.getUsers(chatId);
      return users;
    } catch (e) {
      showErrorModal(`${e}`);
      return [];
    }
  }

  async addChatAvatar(formData: FormData) {
    try {
      await this.api.addChatAvatar(formData);
    } catch (e) {
      showErrorModal(`Ошибка при добавлении аватара: ${e}`);
    }
  }
}

const chatController = new ChatsController();

export default chatController;
