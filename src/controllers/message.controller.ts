import store from "../framework/Store";
import WSTransport, { WSTransportEvents } from "../utils/api/WSTransport";
import processMessages from "../utils/messages/processMessages";
import chatController from "./chat.controller";

export interface Message {
  id: number;
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
  };
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    console.log("Connecting to chat with ID:", id, "and token:", token);
    try {
      if (this.sockets.has(id)) {
        console.log("Already connected to chat:", id);
        return;
      }

      const userId = store.getState().user.id;

      if (!userId || !token) {
        console.error("User ID or token is missing");
        throw new Error("User ID or token is missing");
      }

      const wsTransport = new WSTransport(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
      );
      this.sockets.set(id, wsTransport);

      await wsTransport.connect();
      console.log("WebSocket connected for chat:", id);

      this.subscribe(wsTransport, id);
      this.fetchOldMessages(id);
    } catch (e) {
      console.error("Failed to connect to chat", e);
    }
  }

  sendMessage(id: number, message: string) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      // Проверка readyState через геттер
      if (socket.readyState === WebSocket.CONNECTING) {
        console.log(
          "WebSocket is still connecting, waiting to send message..."
        );

        // Ожидаем открытия WebSocket перед отправкой сообщения
        this.waitForSocketConnection(socket).then(() => {
          if (message.length > 0) {
            socket.send({ type: "message", content: message }); // Используем метод send WSTransport
          }
        });
        return;
      }

      // Если WebSocket не в состоянии OPEN
      if (socket.readyState !== WebSocket.OPEN) {
        console.error(
          "WebSocket is not open, current state:",
          socket.readyState
        );
        return;
      }

      // Если WebSocket открыт, отправляем сообщение
      socket.send({ type: "message", content: message }); // Используем метод send WSTransport
    } catch (e) {
      console.error(e);
    }
  }

  async fetchOldMessages(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      // Проверка состояния WebSocket с повторными попытками
      if (socket.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket is still connecting, waiting...");
        await this.waitForSocketConnection(socket);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send({ type: "get old", content: "0" });
      } else {
        console.error(
          "WebSocket is not open, current state:",
          socket.readyState
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  private waitForSocketConnection(socket: WSTransport): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          clearInterval(interval);
          resolve();
        }
      }, 100); // Проверяем состояние соединения каждые 100 мс
    });
  }

  closeAll() {
    try {
      Array.from(this.sockets.values()).forEach((socket) => socket.close());
    } catch (e) {
      console.error(e);
    }
  }

  private onMessage(id: number, messages: Message | Message[]) {
    try {
      let messagesToAdd: Message[] = [];

      if (Array.isArray(messages)) {
        if (messages.length === 0) {
          console.log(`No messages found for chat ${id}`);
        } else {
          messagesToAdd = messages.reverse(); // Переворачиваем, чтобы новые сообщения шли сверху
        }
      } else if (messages) {
        messagesToAdd.push(messages); // Добавляем одно сообщение
      }

      // Получаем текущие сообщения для чата или создаем пустой объект
      const currentMessages = store.getState().messages[id] || [];
      const filteredMessagesToAdd = messagesToAdd.filter((newMessage) => {
        return !currentMessages.some(
          (existingMessage) => existingMessage.id === newMessage.id
        );
      });

      // Если есть новые сообщения, добавляем их
      if (filteredMessagesToAdd.length > 0) {
        const updatedMessages = [...currentMessages, ...filteredMessagesToAdd];
        store.set(`messages.${id}`, updatedMessages);
      }

      // Обновляем последнее сообщение в соответствующем чате
      const chats = store.getState().chats;
      const updatedChats = chats.map((chat) => {
        if (chat.id === id) {
          const lastMessage = messagesToAdd.reduce((latest, current) => {
            return new Date(latest.time) > new Date(current.time)
              ? latest
              : current;
          });

          return {
            ...chat,
            last_message: {
              user: {
                id: lastMessage.user_id,
              },
              content: lastMessage.content,
              time: lastMessage.time,
            },
          };
        }
        return chat;
      });
      // Сохраняем обновленные чаты в хранилище
      store.set("chats", updatedChats);
    } catch (e) {
      console.error("Failed to update messages for chat", e);
    }
  }

  private onClose(id: number) {
    try {
      console.log(`WebSocket closed for chat ${id}, reconnecting...`);
      this.sockets.delete(id);

      const token = chatController.getToken(id); // Получаем токен заново
      this.connect(id, token); // Попытка переподключения
    } catch (e) {
      console.error(e);
    }
  }
  private subscribe(transport: WSTransport, id: number) {
    try {
      transport.on(WSTransportEvents.Message, (rawData: unknown) => {
        try {
          // Преобразуем rawData в unknown, а затем проверяем, является ли это массивом
          const parsedData =
            typeof rawData === "string" ? JSON.parse(rawData) : rawData;

          if (Array.isArray(parsedData)) {
            // Если это массив, обрабатываем его как массив сообщений
            this.onMessage(id, parsedData as Message[]);
          } else if (parsedData) {
            // Если это объект, обрабатываем его как одно сообщение
            this.onMessage(id, parsedData as Message);
          } else {
            console.error("Received invalid message format:", rawData);
          }
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
