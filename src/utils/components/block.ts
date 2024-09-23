import { EventBus } from "../events/event-bus";

export abstract class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  private _element: HTMLElement | DocumentFragment | null = null;
  private _meta: Meta | null = null;
  protected props: Props;
  private eventBus: () => EventBus;

  constructor(tagName: string | string[] = "div", props: Props) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, (oldProps: Props, newProps: Props) => {
      this._componentDidUpdate(oldProps, newProps);
    });
  }

  private _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this._addEvents();
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  get element(): HTMLElement | DocumentFragment | null {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();

    if (typeof block === "string") {
      const template = document.createElement("template");
      template.innerHTML = block.trim();
      this._element!.innerHTML = "";
      this._element!.appendChild(template.content);
    } else if (block instanceof HTMLElement) {
      this._element!.innerHTML = "";
      this._element!.appendChild(block);
    } else if (block instanceof DocumentFragment) {
      this._element!.innerHTML = "";
      this._element!.appendChild(block);
    }

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  abstract render(): string | HTMLElement | DocumentFragment;

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        self.hasAccessRights(prop);
        return target[prop];
      },
      set(target, prop: string, value) {
        self.hasAccessRights(prop);
        if (target[prop] !== value) {
          const oldProps = { ...target };
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      deleteProperty(target, prop: string) {
        throw new Error(`Удаление свойства ${prop} из props запрещено`);
      },
    });
  }

  private _createDocumentElement(
    tagName: string | string[]
  ): HTMLElement | DocumentFragment {
    if (typeof tagName === "string") {
      return document.createElement(tagName);
    }
    if (Array.isArray(tagName)) {
      const fragment = document.createDocumentFragment();

      tagName.forEach((tag) => {
        const element = document.createElement(tag);
        fragment.appendChild(element);
      });
      return fragment;
    }
    throw new Error("Произошла ошибка. Ожидается строка или массив");
  }

  private _addEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, EventListener>;
    };
    if (this._element instanceof HTMLElement) {
      Object.keys(events).forEach((eventName) => {
        this._element!.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, EventListener>;
    };
    if (this._element instanceof HTMLElement) {
      Object.keys(events).forEach((eventName) => {
        this._element!.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  show() {
    if (this.element instanceof HTMLElement) {
      this.element.style.display = "block";
    }
  }

  hide() {
    if (this.element instanceof HTMLElement) {
      this.element.style.display = "none";
    }
  }

  private hasAccessRights(prop: string) {
    if (prop.startsWith("_")) {
      throw new Error("Нет прав");
    }
    return true;
  }
}
