import Handlebars from 'handlebars';
import ChatListHeader from './components/chat-list-header/chat-list-header';
import СhatList from './components/chats-list/chats-list';

Handlebars.registerPartial('ChatListHeader', ChatListHeader);
Handlebars.registerPartial('СhatList', СhatList);

const LeftPanel = `
  <div class="left-panel">    
  ${ChatListHeader}
  ${СhatList}
  </div>
`;

export default LeftPanel;