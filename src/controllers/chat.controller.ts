import API, { ChatsAPI } from "../utils/api/chat-api";
import MessagesController from "../controllers/message.controller";
import store from "../framework/Store";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (e) {
      // console.error(e);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      if (Array.isArray(chats)) {
        chats.map(async (chat) => {
          const token = await this.getToken(chat.id);

          await MessagesController.connect(chat.id, token);

          await this.fetchLastMessage(chat.id);
        });

        store.set("chats", chats);
      } else {
        console.error("Unexpected response format:", chats);
      }
    } catch (e) {
      console.error("fetchChats error:", e);
    }
  }

  async fetchLastMessage(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send({ type: "get old", content: "1" }); 
      } else {
        console.error(
          "WebSocket is not open, current state:",
          socket.readyState
        );
      }
    } catch (e) {
      // console.error(e);
    }
  }
  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (e) {
      // console.error(e);
    }
  }

  deleteUserFromChat(id: number, userId: number) {
    try {
      this.api.deleteUsers(id, [userId]);
    } catch (e) {
      // console.error(e);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);

      this.fetchChats();
    } catch (e) {
      // console.error(e);
    }
  }

  async getToken(id: number) {
    try {
      const token = await this.api.getToken(id);
      return token;
    } catch (e) {
      // console.error('Failed to get token for chat', e);
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
}

const chatController = new ChatsController();

export default chatController;
