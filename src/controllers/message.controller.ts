import showErrorModal from "../components/modal/showErrorModal";
import store from "../framework/Store";
import WSTransport, { WSTransportEvents } from "../utils/api/WSTransport";
import processMessages from "../utils/messages/processMessages";
import chatController from "./chat.controller";

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    try {
      if (this.sockets.has(id)) {
        return;
      }

      const userId = store.getState().user.id;

      if (!userId || !token) {
        showErrorModal(`User ID or token is missing`);
        // throw new Error("User ID or token is missing");
      }

      const wsTransport = new WSTransport(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
      );
      this.sockets.set(id, wsTransport);

      await wsTransport.connect();

      this.subscribe(wsTransport, id);
      this.fetchOldMessages(id);
    } catch (e) {
      // console.error("Failed to connect to chat", e);
      // showErrorModal(`${e}`);
    }
  }

  sendMessage(id: number, message: string) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.CONNECTING) {
        this.waitForSocketConnection(socket).then(() => {
          if (message.length > 0) {
            socket.send({ type: "message", content: message });
          }
        });
        return;
      }

      if (socket.readyState !== WebSocket.OPEN) {
        // console.error(
        //   "WebSocket is not open, current state:",
        //   socket.readyState
        // );
        // showErrorModal(`Ошибка: WebSocket is not open, current state: ${socket.readyState}`);
        return;
      }

      socket.send({ type: "message", content: message });
    } catch (e) {
      showErrorModal(`${e}`);
    }
  }

  async fetchOldMessages(id: number) {
    try {
      const socket = this.sockets.get(id);

      if (!socket) {
        throw new Error(`Chat ${id} is not connected`);
      }

      if (socket.readyState === WebSocket.CONNECTING) {
        await this.waitForSocketConnection(socket);
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send({ type: "get old", content: "0" });
      } else {
        // console.error(
        //   "WebSocket is not open, current state:",
        //   socket.readyState
        // );
      }
    } catch (e) {
      // showErrorModal(`Ошибка:  ${e}`);
    }
  }

  private waitForSocketConnection(socket: WSTransport): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  closeAll() {
    try {
      Array.from(this.sockets.values()).forEach((socket) => socket.close());
    } catch (e) {
      // showErrorModal(`Ошибка:  ${e}`);
    }
  }

  private onMessage(id: number, messages: Message | Message[]) {
    try {
      let messagesToAdd: Message[] = [];

      if (Array.isArray(messages)) {
        if (messages.length === 0) {
        } else {
          messagesToAdd = messages.reverse();
        }
      } else if (messages) {
        messagesToAdd.push(messages);
      }


      const currentMessages = store.getState().messages[id] || [];
      const filteredMessagesToAdd = messagesToAdd.filter((newMessage) => {
        return !currentMessages.some(
          (existingMessage) => existingMessage.id === newMessage.id
        );
      });

      if (filteredMessagesToAdd.length > 0) {
        const updatedMessages = [...currentMessages, ...filteredMessagesToAdd];
        const processedMessages = processMessages(updatedMessages);
        store.set(`messages.${id}`, processedMessages);
      }

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
      store.set("chats", updatedChats);
    } catch (e) {
      // console.error("Failed to update messages for chat", e);
      // showErrorModal(`Ошибка:  ${e}`);
    }
  }

  private onClose(id: number) {
    try {
      this.sockets.delete(id);
  
      chatController.getToken(id).then((token) => {
        if (token) {
          this.connect(id, token);
        } else {
          // console.error("Token is undefined");
        }
      });
    } catch (e) {
      // console.error("Failed to reconnect", e);
    }
  }
  
  private subscribe(transport: WSTransport, id: number) {
    try {
      transport.on(WSTransportEvents.Message, (rawData: unknown) => {
        try {
          const parsedData =
            typeof rawData === "string" ? JSON.parse(rawData) : rawData;

          if (Array.isArray(parsedData)) {
            this.onMessage(id, parsedData as Message[]);
          } else if (parsedData) {
            this.onMessage(id, parsedData as Message);
          } else {
            // console.error("Received invalid message format:", rawData);
          }
        } catch (e) {
          // console.error("Failed to parse incoming message:", e);
        }
      });

      transport.on(WSTransportEvents.Close, () => this.onClose(id));
      transport.on(WSTransportEvents.Error, (error) => {
        // console.error(`WebSocket error in chat ${id}`, error);
      });
    } catch (e) {
      // console.error(e);
    }
  }
}

const messagesController = new MessagesController();

export default messagesController;
