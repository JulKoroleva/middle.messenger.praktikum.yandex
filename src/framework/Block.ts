import EventBus, { EventCallback } from "./EventBus";
import Handlebars from "handlebars";
interface Props {
  [key: string]: any;
}

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement | null = null;

  protected _id: number = Math.floor(100000 + Math.random() * 900000);

  protected props: Props;

  protected refs: Record<string, Block> = {};

  protected children: Record<string, Block>;

  protected lists: Record<string, any[]>;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this) as EventCallback
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as EventCallback
    );
    eventBus.on(
      Block.EVENTS.FLOW_RENDER,
      this._render.bind(this) as EventCallback
    );
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  private _getChildrenPropsAndProps(propsAndChildren: Props): {
    children: Record<string, Block>;
    props: Props;
    lists: Record<string, any[]>;
  } {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: Record<string, any[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  protected compile(template: (context: Props) => string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = template(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: Props) => {
      embed(temp.content);
    });

    return temp.content;
  }

  private _render(): void {
    console.log('Render');
    const propsAndStubs = { ...this.props };
    const _tmpId =  Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error("Element is not created");
    }
    return this._element;
  }

  private _makePropsProxy(props: Props): Props {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}

export default Block;