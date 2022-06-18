import type ChatAPI from "../../interface";

import { ChatServiceClient } from "./protos/ChatServiceClientPb";
import { SendMessageRequest, OnMessageRequest } from "./protos/chat_pb";
import type { StreamInterceptor, UnaryInterceptor } from "grpc-web";

declare const __gRPC_devtools__:
  | undefined
  | {
      gRPCDevtoolsStreamInterceptor: StreamInterceptor<unknown, unknown>;
      gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
    };
const gRPCDevtoolsStreamInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsStreamInterceptor;
const streamInterceptors = gRPCDevtoolsStreamInterceptor
  ? [gRPCDevtoolsStreamInterceptor]
  : [];
const gRPCDevtoolsUnaryInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsUnaryInterceptor;
const unaryInterceptors = gRPCDevtoolsUnaryInterceptor
  ? [gRPCDevtoolsUnaryInterceptor]
  : [];

class GrpcChatAPI implements ChatAPI {
  private chatService;
  private channel;

  constructor() {
    this.chatService = new ChatServiceClient("http://localhost:3003", null, {
      unaryInterceptors: unaryInterceptors,
      streamInterceptors: streamInterceptors,
    });

    const enableDevTools = (window as any).__GRPCWEB_DEVTOOLS__ || (() => {});
    enableDevTools([this.chatService]);

    this.channel = this.chatService.onMessage(new OnMessageRequest());
  }

  sendMessage(message: string): void {
    const request = new SendMessageRequest();
    request.setMessage(message);
    this.chatService.sendMessage(request, null);
  }

  onMessage(listener: (message: string) => void): void {
    this.channel.on("data", (response) => {
      listener(response.getMessage());
    });
  }
}

export default GrpcChatAPI;
