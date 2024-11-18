import { expect } from "chai";
import sinon from "sinon";
import Block from "./Block.ts";
import EventBus from "./EventBus.ts";

describe("Block", () => {
  let instance: Block;
  let eventBus: sinon.SinonStubbedInstance<EventBus>;

  beforeEach(() => {
    eventBus = sinon.createStubInstance(EventBus);
    instance = new Block({}, eventBus);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("Initialization", () => {
    it("должен инициализироваться с уникальным id", () => {
      expect(instance.id).to.be.a("string");
    });

    it("должен отправить INIT событие при создании", () => {
      expect(eventBus.emit.calledWith(Block.EVENTS.INIT)).to.be.true;
    });
  });

  describe("setProps", () => {
    it("должен обновить props и вызвать FLOW_CDU событие", () => {
      const newProps = { newKey: "newValue" };
      instance.setProps(newProps);

      expect(instance.getProps("newKey")).to.equal("newValue");
      expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
    });
  });

  describe("Component lifecycle", () => {
    it("должен вызвать событие FLOW_RENDER при инициализации", () => {
      instance["_init"]();
      expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_RENDER)).to.be.true;
    });

    it("dispatchComponentDidMount должен вызывать FLOW_CDM", () => {
      instance.dispatchComponentDidMount();

      expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_CDM)).to.be.true;
    });

    it("должен вызвать componentDidUpdate и FLOW_RENDER при обновлении", () => {
      const componentDidUpdateSpy = sinon.spy(instance, "componentDidUpdate");
      instance["_componentDidUpdate"]();
      expect(componentDidUpdateSpy.calledOnce).to.be.true;
      expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_RENDER)).to.be.true;
    });
  });

  describe("Element manipulation", () => {
    it("должен показать элемент, установив display в 'block'", () => {
      const getContentStub = sinon
        .stub(instance, "getContent")
        .returns(document.createElement("div"));
      instance.show();
      const element = getContentStub();

      if (element) {
        expect(element.style.display).to.equal("block");
      }
    });

    it("должен скрыть элемент, установив display в 'none'", () => {
      const getContentStub = sinon
        .stub(instance, "getContent")
        .returns(document.createElement("div"));
      instance.hide();
      const element = getContentStub();

      if (element) {
        expect(element.style.display).to.equal("none");
      }
    });
  });

  describe("Event handling", () => {
    it("должен добавлять события из props", () => {
      const clickHandler = sinon.spy();
      const block = new Block({ events: { click: clickHandler } });
      const element = document.createElement("div");

      block["_element"] = element;
      block["_addEvents"]();
      element.click();

      expect(clickHandler.calledOnce).to.be.true;
    });

    it("должен удалять события из props", () => {
      const clickHandler = sinon.spy();
      const block = new Block({ events: { click: clickHandler } });
      const element = document.createElement("div");

      block["_element"] = element;
      block["_addEvents"]();
      block["_removeEvents"]();
      element.click();

      expect(clickHandler.called).to.be.false;
    });
  });
});
