import union from "../../../static/assets/union.svg";
import arrowBtn from "../../../static/assets/arrowBtn.svg";

import templateProfilePage from "./profile-page.hbs";
import Block from "../../framework/Block";
import { createButtons, createInputs } from "../../constants/profile/profile.constants";
// export default profilePage;

interface PropsProfilePage {
  currentUserData: UserInfo;
  changePage: (page: string) => void;
}

export default class ProfilePage extends Block {
  constructor(props: PropsProfilePage) {
    super({
      buttons: createButtons(props.changePage),
      inputs: createInputs(props.currentUserData),
      union,
      arrowBtn,
      onChangePage: (e: MouseEvent) => {
        e.preventDefault();
        props.changePage("mainPage");
      },
      ...props,
    });
  }

  render() {
    return this.compile(templateProfilePage, this.props);
  }
}