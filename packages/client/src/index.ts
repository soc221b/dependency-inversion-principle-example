import type IChatAPI from "./interface";

// Change the following to use a different API implementation
// import ChatAPI from "./implementations/polling"; // comment out and uncomment the other lines to switch between implementations
// import ChatAPI from "./implementations/web-socket";
import ChatAPI from "./implementations/graph-ql";

const chatApi: IChatAPI = new ChatAPI();

// With dependency inversion, we can use a different API implementation without changing the following code.
const messagesElement = document.getElementById(
  "messages"
)! as HTMLUListElement;
const formElement = document.getElementById("form")! as HTMLFormElement;
const inputElement = document.getElementById("input")! as HTMLInputElement;

formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputElement.value) {
    chatApi.sendMessage(inputElement.value);
    inputElement.value = "";
  }
});

chatApi.onMessage((message) => {
  const item = document.createElement("li");
  item.textContent = message;
  messagesElement.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
