import type ChatAPI from "../../interface";

import { ChatServiceClient } from "./protos/ChatServiceClientPb";
import { Message } from "./protos/chat_pb";

class GrpcChatAPI implements ChatAPI {
  private chatService = new ChatServiceClient("http://localhost:3003");

  constructor() {
    const enableDevTools = (window as any).__GRPCWEB_DEVTOOLS__ || (() => {});
    enableDevTools([this.chatService]);
  }

  sendMessage(message: string): void {
    const request = new Message();
    request.setMessage(message);
    this.chatService.sendMessage(request, null);
  }

  onMessage(listener: (message: string) => void): void {}
}

export default GrpcChatAPI;
