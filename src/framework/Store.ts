import EventBus from "./EventBus";
import Block from "./Block";
import { ChatInfo } from "../utils/api/chat-api";
import { User } from "../utils/api/auth-api";
import { set } from "../helpers/store.helper";
import isEqual from "../utils/isEqual";

interface State {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat: number;
}

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: any = {};

  public getState(): State {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export function withStore(mapStateToProps: (state: State) => any) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}

const store = new Store();
export default store;
