const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: {}, transports: ["polling"] });

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening on localhost:3000");
});
