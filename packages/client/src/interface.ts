// The minimal interface for a chat API.
interface ChatAPI {
  sendMessage(message: string): void;

  onMessage(listener: (message: string) => void): void;
}

export default ChatAPI;
