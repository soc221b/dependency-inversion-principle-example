const { createServer, createPubSub } = require("@graphql-yoga/node");

const pubSub = createPubSub();

const server = createServer({
  hostname: "localhost",
  port: 3002,
  schema: {
    typeDefs: `
      type Query {
        void: Boolean
      }

      type Mutation {
        sendMessage(message: String!): Boolean!
      }

      type Subscription {
        onMessage: String!
      }
    `,
    resolvers: {
      Mutation: {
        sendMessage: (_, { message }) => {
          pubSub.publish("message", message);
          return true;
        },
      },
      Subscription: {
        onMessage: {
          subscribe: () => pubSub.subscribe("message"),
          resolve: (payload) => payload,
        },
      },
    },
  },
});

server.start();
