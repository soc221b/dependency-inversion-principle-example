const PROTO_PATH = __dirname + "/chat.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const chat_proto = grpc.loadPackageDefinition(packageDefinition).chat;

function sendMessage(call, callback) {
  console.log(call.request);
  // callback(null, { message: "Hello " + call.request.name });
  callback(null, { message: "Hello " + call.request.name });
}

function onMessage(call) {
  call.write({ message: "123" });
  call.write({ message: "123" });
}

/**
 * Starts an RPC server that receives requests for the Chat service at the
 * sample server port
 */
function main() {
  const host = "0.0.0.0";
  const port = 9090;
  const server = new grpc.Server();
  server.addService(chat_proto.ChatService.service, { sendMessage, onMessage });
  server.bindAsync(
    `${host}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(`Server running at ${host}:${port}`);
    }
  );
}

main();
