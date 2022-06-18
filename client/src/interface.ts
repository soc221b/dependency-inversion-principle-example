// The minimal interface for a chat API.
interface ChatAPI {
  sendMessage(message: string): void;

  /*
   * See also:
   * file://./implementations/grpc/index.ts#L27
   * file://./implementations/long-polling/index.ts#L14
   * file://./implementations/server-side-events/index.ts#L41
   * file://./implementations/web-socket/index.ts#L12
   */
  onMessage(listener: (message: string) => void): void;
}

export default ChatAPI;
