import type ChatAPI from "../../interface";

const url = "http://localhost:3002/graphql";

class ServerSideEventsChatAPI implements ChatAPI {
  private eventsource: EventSource;

  constructor() {
    const eventSourceUrl = new URL(url);
    eventSourceUrl.searchParams.append(
      "query",
      `
        subscription {
          onMessage
        }
      `
    );
    this.eventsource = new EventSource(eventSourceUrl.toString());
  }

  sendMessage(message: string): void {
    fetch(url, {
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

export default ServerSideEventsChatAPI;
