// Choose one of the following implementation:
// import ChatAPI from "./implementations/grpc";
import ChatAPI from "./implementations/long-polling";
// import ChatAPI from "./implementations/server-side-events";
// import ChatAPI from "./implementations/web-socket";

import { mountForm, mountMessages, unmountMessages } from "./render";
import "./index.css";

const chatApi = new ChatAPI();

const messages: string[] = [];
chatApi.onMessage((message) => {
  messages.push(message);

  unmountMessages();
  mountMessages({ messages });
});

mountForm({ onSubmit: (message) => chatApi.sendMessage(message) });
