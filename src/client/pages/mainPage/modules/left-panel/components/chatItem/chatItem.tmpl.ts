const ChatItem = (context: { chatName: any; chatLastMessage: any; lastMessageDate: any; newMessages: any; }) => {
  const { chatName, chatLastMessage, lastMessageDate, newMessages } = context;
  const hasNewMessages = newMessages !== '0' && newMessages !== '';

  return `
    <div class="chat ${hasNewMessages ? 'chat_highlighted' : ''}">
      <div class="chat__info">
        <div class="chat__details">
          <h6 class="chat__title">${chatName}</h6>
          <p class="chat__last-message">${chatLastMessage}</p>
        </div>
      </div>
      <div class="chat__date-info">
        <p class="chat__date">${lastMessageDate}</p>
        ${hasNewMessages ? `
        <div class="chat__unread">
          <p class="chat__unread-count">${newMessages}</p>
        </div>
        ` : ''}
      </div>
    </div>
  `;
};

export default ChatItem;
