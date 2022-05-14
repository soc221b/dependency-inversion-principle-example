import type ChatAPI from "../interface";

class GraphQLChatAPI implements ChatAPI {
  private eventsource: EventSource;

  constructor() {
    const url = new URL("http://localhost:3002/graphql");
    url.searchParams.append(
      "query",
      `
        subscription {
          onMessage
        }
      `
    );

    this.eventsource = new EventSource(url.toString());
  }

  sendMessage(message: string): void {
    fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation ($message: String!) {
            sendMessage(message: $message)
          }
        `,
        variables: { message },
      }),
    });
  }

  onMessage(listener: (message: string) => void): void {
    this.eventsource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      listener(data.data.onMessage);
    };
  }
}

export default GraphQLChatAPI;
