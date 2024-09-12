import ellipseIcon from "../../../../../../../../static/assets/ellipseIcon.svg";

const Header = `
  <div class="dialog__header">
    <div class="header__title-container">
      <img class="container__avatar" src={{avatar}} alt="img">
      <p class="container__title">{{chatName}}</p>
    </div>
    {{> Button buttonImage="${ellipseIcon}" buttonClass="header__ellipse" imageAlt="settings"}}
  </div>
`;

export default Header;
