import Handlebars from "handlebars";
import СhatItem from "../chatItem/chatItem.tmpl";

Handlebars.registerPartial("СhatItem", СhatItem);

const СhatList = `
  <div class="chat-list">    
    {{#each chats}}
    {{> СhatItem
      chatName=this.chatUserName
      chatLastMessage=this.chatLastMessage
      lastMessageDate=this.lastMessageDate
      newMessages=this.newMessages
    }}
    {{/each}}
  </div>
`;

export default СhatList;
