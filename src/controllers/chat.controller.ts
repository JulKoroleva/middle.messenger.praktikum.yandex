import API, { ChatsAPI } from '../utils/api/chat-api';
import MessagesController from '../controllers/message.controller'
import store from '../framework/Store';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    console.log('create')
    try {
      console.log('try 1')
      await this.api.create(title);
console.log('try1')
      this.fetchChats();
      console.log('try3')
    } catch (e) {
      console.log('catch')
      console.error(e);
    }
  }

  async fetchChats() {
    console.log('fetchChats');
    try {
      console.log('fetchChats try');
      const chats = await this.api.read();
  
      if (Array.isArray(chats)) {
        console.log('fetchChats chats', chats);
        chats.map(async (chat) => {
          console.log('chat.id', chat.id);
          const token = await this.getToken(chat.id) as string;
  
          await MessagesController.connect(chat.id, token);
        });
  
        store.set('chats', chats);
      } else {
        console.error('Unexpected response format:', chats);
      }
    } catch (e) {
      console.log('fetchChats e');
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


  async getToken(id: number) {
    try {
      const token = await this.api.getToken(id);
      console.log(`Token for chat ${id}:`, token);
      return token;
    } catch (e) {
      console.error('Failed to get token for chat', e);
    }
  }

  selectChat(id: number) {
    // Проверяем, существует ли объект messages в store
    const messagesState = store.getState().messages || {};
  
    // Инициализируем пустой массив сообщений для чата, если его нет
    if (!messagesState[id]) {
      messagesState[id] = [];
      store.set('messages', messagesState);
    }
  
    // Устанавливаем выбранный чат
    store.set('selectedChat', id);
  
    // Загружаем старые сообщения для чата
    MessagesController.fetchOldMessages(id);
  }
  
}

const chatController = new ChatsController();

export default chatController;