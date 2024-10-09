import union from "../../../static/assets/union.svg";
import arrowBtn from "../../../static/assets/arrowBtn.svg";

import templateProfilePage from "./profile-page.hbs";
import Block from "../../framework/Block";
import {
  createButtons,
  createInputs,
} from "../../constants/profile/profile.constants";
import Button from "../../components/button/button";
import { validateForm } from "../../validators/form.validator";

export default class ProfilePage extends Block {
  constructor(props: PropsProfilePage) {
    super(props);

    this.props.isEditing = false;

    this.props.buttons = createButtons(
      props.changePage,
      this.toggleEditing.bind(this)
    );
    this.props.inputs = createInputs(
      props.currentUserData,
      this.props.isEditing
    );
    this.props.union = union;
    this.props.arrowBtn = arrowBtn;
    this.props.saveChanges = this.saveChanges.bind(this);

    this.props.onChangePage = (e: MouseEvent) => {
      e.preventDefault();
      props.changePage("mainPage");
    };
  }

  toggleEditing() {
    this.setProps({ isEditing: !this.props.isEditing });
  }

  saveChanges(e: MouseEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formIsValid = validateForm(form);
    if (formIsValid) {
      const formData = new FormData(form);
      const formDataObject = Object.fromEntries((formData as any).entries());
      console.log("formDataObject", formDataObject);
      this.setProps({ isEditing: false });
    } else {
      throw new Error("Form is invalid");
    }
  }

  render() {
    const isEditing = this.props.isEditing;

    const buttons = isEditing
      ? [
          new Button({
            buttonText: "Сохранить изменения",
            buttonClass: "button_primary",
            buttonType: "submit",
          }),
        ]
      : this.props.buttons;

    const inputs = createInputs(this.props.currentUserData, isEditing);

    return this.compile(templateProfilePage, {
      ...this.props,
      buttons,
      inputs,
    });
  }
}
