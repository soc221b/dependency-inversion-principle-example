// Choose one of the following implementation:
// import ChatAPIImplementation from "./implementations/grpc";
import ChatAPIImplementation from "./implementations/long-polling";
// import ChatAPIImplementation from "./implementations/server-sent-events";
// import ChatAPIImplementation from "./implementations/web-socket";

import { mount } from "./render";
mount({
  chatApi: new ChatAPIImplementation(),
});
