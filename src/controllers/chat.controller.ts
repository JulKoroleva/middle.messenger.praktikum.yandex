import API, { ChatsAPI } from '../utils/api/chat-api';
import MessagesController from '../controllers/message.controller'
import store from '../framework/Store';

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
      console.error(e);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id) as string;

        await MessagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (e) {
      console.error(e);
    }
  }

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
    } catch (e) {
      console.error(e);
    }
  }

  deleteUserFromChat(id: number, userId: number) {
    try {
      this.api.deleteUsers(id, [userId]);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);

      this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  getToken(id: number) {
    try {
      return this.api.getToken(id);
    } catch (e) {
      console.error(e);
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const chatController = new ChatsController();

export default chatController;
