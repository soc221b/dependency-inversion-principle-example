import type ChatAPI from "../../interface";

import { io } from "socket.io-client";

class LongPollingChatAPI implements ChatAPI {
  private io = io("http://localhost:3000", { transports: ["polling"] });

  sendMessage(message: string): void {
    this.io.emit("message", message);
  }

  onMessage(listener: (message: string) => void): void {
    this.io.on("message", (message: string) => {
      listener(message);
    });
  }
}

export default LongPollingChatAPI;
