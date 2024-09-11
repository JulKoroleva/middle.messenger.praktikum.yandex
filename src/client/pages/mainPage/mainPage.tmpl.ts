import Handlebars from "handlebars";
import СhatList from './modules/left-panel/left-panel.tmpl';
import Messages from './modules/messages/messages';

Handlebars.registerPartial('СhatList', СhatList);
Handlebars.registerPartial('Messages', Messages);

const mainPage = `
  <main class="main-page">
    {{> СhatList}}
    {{> Messages}}
  </main>`;
export default mainPage ;