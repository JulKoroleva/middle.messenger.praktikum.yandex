import searchIcon from '../../../../../../../../static/assets/searchIcon.svg';

const ChatListHeader = `
  <div class="chat-list-header">
    <a class="chat-list-header__button" href="/profile">
     {{> Button buttonText="Профиль >" buttonClass="button_link"}}
    </a>
    <div class="chat-list-header__search-container">
      <input class="chat-list-header__search-input" type="text" placeholder="Поиск">
      <img class="chat-list-header__search-icon" src=${searchIcon} alt="Поиск">
    </div>
  </div>
`;

export default ChatListHeader;