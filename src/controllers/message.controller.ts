import store from "../framework/Store";
import WSTransport, { WSTransportEvents } from "../utils/api/WSTransport";


export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    console.log('Connecting to chat with ID:', id, 'and token:', token);
    try {
      if (this.sockets.has(id)) {
        console.log('Already connected to chat:', id);
        return;
      }
  console.log('store', store)
  console.log('store.getState().user.id', store.getState().user.id)
      const userId = store.getState().user.id;
  
      if (!userId || !token) {
        console.error('User ID or token is missing');
        throw new Error('User ID or token is missing');
      }
  
      const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
  
      this.sockets.set(id, wsTransport);
  
      await wsTransport.connect();
      console.log('WebSocket connected for chat:', id);
  
      this.subscribe(wsTransport, id);
      this.fetchOldMessages(id);
    } catch (e) {
      console.error('Failed to connect to chat', e);
    }
  }

  sendMessage(id: number, message: string) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (message.length === 0) {
        return;
      }

      socket.send({
        type: 'message',
        content: message,
      });
    } catch (e) {
      console.error(e);
    }
  }

  fetchOldMessages(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      socket.send({type: 'get old', content: '0'});
    } catch (e) {
      console.error(e);
    }
  }

  closeAll() {
    try {
      Array.from(this.sockets.values()).forEach(socket => socket.close());
    } catch (e) {
      console.error(e);
    }
  }

  private onMessage(id: number, messages: Message | Message[]) {
    try {
      let messagesToAdd: Message[] = [];

      if (Array.isArray(messages)) {
        messagesToAdd = messages.reverse();
      } else {
        messagesToAdd.push(messages);
      }

      const currentMessages = (store.getState().messages || {})[id] || [];

      messagesToAdd = [...currentMessages, ...messagesToAdd] as Message[];

      store.set(`messages.${id}`, messagesToAdd);
    } catch (e) {
      console.error(e);
    }
  }

  private onClose(id: number) {
    try {
      this.sockets.delete(id);
    } catch (e) {
      console.error(e);
    }
  }

  private subscribe(transport: WSTransport, id: number) {
    try {
      transport.on(WSTransportEvents.Message, (rawData: unknown) => {
        try {
          // Предполагаем, что сообщение приходит в формате JSON
          const parsedData = JSON.parse(rawData as string) as Message;
  
          // Обрабатываем сообщение
          this.onMessage(id, parsedData);
        } catch (e) {
          console.error("Failed to parse incoming message:", e);
        }
      });
  
      transport.on(WSTransportEvents.Close, () => this.onClose(id));
      transport.on(WSTransportEvents.Error, (error) => {
        console.error(`WebSocket error in chat ${id}`, error);
      });
    } catch (e) {
      console.error(e);
    }
  }
  
}


const messagesController = new MessagesController();

export default messagesController;
