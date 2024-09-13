import union from "../../../../../../../static/assets/union.svg";

const ChatItem = (context: {
  chatName: any;
  chatLastMessage: any;
  lastMessageDate: any;
  newMessages: any;
}) => {
  const { chatName, chatLastMessage, lastMessageDate, newMessages } = context;
  const hasNewMessages = newMessages !== "0" && newMessages !== "";

  return `
    <div class="chat ${hasNewMessages ? "chat_highlighted" : ""}">
      <div class="chat__info">      
      <img class="chat__avatar" src=${union} alt="Аватар">
        <div class="chat__details">
          <h6 class="chat__title">${chatName}</h6>
          <p class="chat__last-message">${chatLastMessage}</p>
        </div>
      </div>
      <div class="chat__date-info">
        <p class="chat__date">${lastMessageDate}</p>
        ${
          hasNewMessages
            ? `
        <div class="chat__unviewed">
          <p class="chat__unviewed-count">${newMessages}</p>
        </div>
        `
            : ""
        }
      </div>
    </div>
  `;
};

export default ChatItem;
