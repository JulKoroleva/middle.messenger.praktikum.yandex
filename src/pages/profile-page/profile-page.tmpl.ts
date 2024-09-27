import union from "../../../static/assets/union.svg";
import arrowBtn from "../../../static/assets/arrowBtn.svg";

import templateProfilePage from "./profile-page.hbs";
import Block from "../../framework/Block";
import { createButtons, createInputs } from "../../constants/profile/profile.constants";
// export default profilePage;


export default class ProfilePage extends Block {
  constructor(props: PropsProfilePage) {
    super({
      ...props,
      isEditable: false,  // начальное состояние редактирования
      toggleEdit: () => {
        this.setProps({ isEditable: !this.props.isEditable });
      },
      saveChanges: (e: MouseEvent) => {
        e.preventDefault();
        const form = document.getElementById('profileForm') as HTMLFormElement;
        const formData = new FormData(form);
        console.log(Object.fromEntries((formData as any).entries()));
        this.setProps({ isEditable: false }); 
      },
      buttons: createButtons(props.changePage),
      inputs: createInputs(props.currentUserData),
      union,
      arrowBtn,
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        props.changePage("mainPage");
      },
    });
  }

  render() {
    return this.compile(templateProfilePage, this.props);
  }
}
