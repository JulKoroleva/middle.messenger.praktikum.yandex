import "../../helpers/index";

import Handlebars from 'handlebars';
import Block from '../../framework/Block';
import {HelperOptions} from "handlebars";
import Button from '../../components/button/button';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Popup from '../../components/popup/popup';
import Modal from '../../components/modal/modal';
import LeftPanel from '../../pages/main-page/modules/left-panel/left-panel';
import ChatListHeader from '../../pages/main-page/modules/left-panel/components/chat-list-header/chat-list-header';
import ChatItem from '../../pages/main-page/modules/left-panel/components/chatItem/chatItem';
import СhatList from '../../pages/main-page/modules/left-panel/components/chats-list/chats-list';
import DialogHeader from '../../pages/main-page/modules/messages/components/dialog-header/dialog-header.tmpl';
import InputBar from '../../pages/main-page/modules/messages/components/input-bar/input-bar.tmpl';
import MessageItem from '../../pages/main-page/modules/messages/components/message/message.tmpl';
import {Messages} from '../../pages/main-page/modules/messages/messages';

export function registerComponent(name: string, Component: typeof Block) {
  if (name in Handlebars.helpers) {
    throw `The ${name} component is already registered!`;
  }

  Handlebars.registerHelper(name, function (this: unknown, {hash, data, fn}: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;

    if ('ref' in hash) {
      (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
    }

    (data.root.__children = data.root.__children || []).push({
      component,
      embed(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) {
          return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.getContent()!);
      }
    });

    const contents = fn ? fn(this) : '';

    return `<div ${dataAttribute}>${contents}</div>`;
  });
}


registerComponent('Form', Form);
registerComponent('Button', Button);
registerComponent('Input', Input);
registerComponent('Popup', Popup);
registerComponent('Modal', Modal);
registerComponent('LeftPanel', LeftPanel);
registerComponent('СhatList', СhatList);
registerComponent('ChatListHeader', ChatListHeader);
registerComponent('ChatItem', ChatItem);
registerComponent('DialogHeader', DialogHeader);
registerComponent('InputBar', InputBar);
registerComponent('MessageItem', MessageItem);
registerComponent('Messages', Messages);
