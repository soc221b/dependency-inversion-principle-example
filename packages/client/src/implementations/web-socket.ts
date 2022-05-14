import type ChatAPI from "../interface";

class WebSocketChatAPI implements ChatAPI {
  private webSocket: WebSocket = new WebSocket("ws://localhost:3001");

  sendMessage(message: string): void {
    this.webSocket.send(message);
  }

  onMessage(listener: (message: string) => void): void {
    this.webSocket.onmessage = (event) => {
      listener(event.data);
    };
  }
}

export default WebSocketChatAPI;
