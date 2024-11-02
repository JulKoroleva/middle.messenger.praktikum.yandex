import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import Input from "./input.ts";

const defaultInputProps = {
  inputName: "testInput",
  inputLabel: "Test Label",
  inputType: "text",
  inputMainClass: "input-main",
  inputClass: "input",
  labelClass: "label",
  inputValue: "",
  isEditing: true,
  onClick: sinon.stub(),
  events: {
    click: () => {},
    focus: () => {},
    focusout: () => {},
  },
};

describe("Input", () => {
  let instance: Input;
  let activatePlaceholderStub: SinonStub;
  let deactivatePlaceholderStub: SinonStub;
  let validateInputStub: SinonStub;

  beforeEach(() => {
    activatePlaceholderStub = sinon.stub();
    deactivatePlaceholderStub = sinon.stub();
    validateInputStub = sinon.stub().returns(true);

    instance = new Input(defaultInputProps);

    instance.getEvents().focus = (e: Event) => activatePlaceholderStub(e.target as HTMLElement);
    instance.getEvents().focusout = (e: Event) => {
      deactivatePlaceholderStub(e.target as HTMLElement);
      validateInputStub(e.target as HTMLInputElement);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("должен вызывать activatePlaceholder при событии focus", () => {
    const inputElement = document.createElement("div");
    inputElement.classList.add("dynamic-input");

    const placeholderElement = document.createElement("div");
    placeholderElement.className = "dynamic-input__placeholder";
    inputElement.appendChild(placeholderElement);

    const event = new Event("focus");
    Object.defineProperty(event, "target", { value: inputElement });

    instance.getEvents().focus(event);

    expect(activatePlaceholderStub.calledOnce).to.be.true;
    expect(activatePlaceholderStub.calledWith(inputElement)).to.be.true;
  });

  it("должен вызывать deactivatePlaceholder и validateInput при событии focusout", () => {
    const inputElement = document.createElement("div");
    const placeholderElement = document.createElement("div");
    placeholderElement.className = "dynamic-input__placeholder";
    inputElement.appendChild(placeholderElement);

    const event = new Event("focusout");
    Object.defineProperty(event, "target", { value: inputElement });

    instance.getEvents().focusout(event);

    expect(deactivatePlaceholderStub.calledOnce).to.be.true;
    expect(deactivatePlaceholderStub.calledWith(inputElement)).to.be.true;
    expect(validateInputStub.calledOnce).to.be.true;
    expect(validateInputStub.calledWith(inputElement)).to.be.true;
  });

  it("должен корректно рендерить шаблон", () => {
    const renderTemplateSpy = sinon.spy(instance, "render");
    instance.render();

    expect(renderTemplateSpy).to.exist;
  });
});
