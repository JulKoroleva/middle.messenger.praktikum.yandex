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
        console.log('fetchChats')
      try {
        const chats = await this.api.read(); // Получаем список чатов
        console.log('Fetched chats:', chats);
  
        chats.map(async (chat) => {
          const token = await this.getToken(chat.id) as string;
          console.log(`Fetched token for chat ${chat.id}: ${token}`);
  
          await MessagesController.connect(chat.id, token); // Подключаем WebSocket для каждого чата
        });
  
        store.set('chats', chats); // Обновляем список чатов в хранилище
      } catch (e) {
        console.error('Failed to fetch chats', e);
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
      store.set('selectedChat', id); // Устанавливаем выбранный чат
    }
  }


const chatController = new ChatsController();

export default chatController;
