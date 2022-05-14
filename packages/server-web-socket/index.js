const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

const host = "localhost";
const port = 3001;

const wss = new WebSocketServer({ host, port });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

console.log(`listening on ${host}:${port}`);
