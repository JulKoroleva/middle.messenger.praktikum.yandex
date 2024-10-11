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
    try {
        const chats = await this.api.read();

        if (Array.isArray(chats)) {
            chats.map(async (chat) => {
                const token = await this.getToken(chat.id);
                
                // Соединяемся с веб-сокетом для получения сообщений
                await MessagesController.connect(chat.id, token);
                
                // Получаем только последнее сообщение для каждого чата
                await MessagesController.fetchLastMessage(chat.id);
            });

            // Сохраняем чаты в store
            store.set('chats', chats);
        } else {
            console.error('Unexpected response format:', chats);
        }
    } catch (e) {
        console.error('fetchChats error:', e);
    }
}

  async fetchLastMessage(id: number) {
    try {
      const socket = this.sockets.get(id);
  
      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }
  
      // Если WebSocket открыт, запрашиваем последнее сообщение (1 сообщение)
      if (socket.readyState === WebSocket.OPEN) {
        socket.send({ type: 'get old', content: '1' }); // Запрашиваем только одно сообщение
      } else {
        console.error('WebSocket is not open, current state:', socket.readyState);
      }
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
    const messagesState = store.getState().messages || {};
  
    if (!messagesState[id]) {
      messagesState[id] = [];
      store.set('messages', messagesState);
    }
  
    // Устанавливаем выбранный чат
    store.set('selectedChat', id);
  
    // Загружаем все сообщения для чата
    MessagesController.fetchOldMessages(id);
  }
}

const chatController = new ChatsController();

export default chatController;