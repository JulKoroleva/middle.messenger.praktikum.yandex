import Handlebars from "../../../../helpers";
import Avatar from "../../../../../static/assets/union.svg"
import MessageItem from "./components/message/message.tmpl";
import Header from "./components/dialog-header/dialog-header.tmpl";
import InputBar from "./components/input-bar/input-bar.tmpl";

Handlebars.registerPartial("Message", MessageItem);
Handlebars.registerPartial("Header", Header);
Handlebars.registerPartial("InputBar", InputBar);

const Messages = `
  <div class="dialog">
    {{> Header avatar="${Avatar}" chatName="John Doe" }}
    <div class="dialog__messages-container">
      {{#each messages}}
        {{> Message showDate=this.showDate isCurrentUser=this.isCurrentUser text=this.text time=this.time }}
      {{/each}}
    {{> InputBar }}
    </div>
  </div>
`;

export default Messages;
