const MessageItem = `
{{#if showDate}}
  <div class="message__date">{{formatDate this.time}}</div>
{{/if}}
<div class="message {{isCurrentUserMessage isCurrentUser ? 'message_mine' : 'message_member'}}">
  <p class="message__text">{{text}}</p>
  <div class="message__time-container">
    <p class="message__time">{{formatTime time}}</p>
  </div>
</div>
`;

export default MessageItem;
