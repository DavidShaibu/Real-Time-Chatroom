// render chat templates to the DOM
// clear the list of chats (when the room changes)

import { formatDistance } from "date-fns";

export class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = "";
  }

  render(data) {
    let before = data.created_at;
    before = new Date(data.created_at.seconds * 1000); // convert the Timestamp object to a Date object

    let now = new Date();
    now = now.getTime();

    const when = formatDistance(before, now, { addSuffix: true });
    const html = `
            <li class="list-group-item active">
                <span class="username">${data.username}</span>:
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
        this.clearPreviousActiveState(); // remove the active state on previous messages
        this.list.innerHTML += html;
  }

  clearPreviousActiveState(){
    this.list.querySelectorAll(".list-group-item")
    .forEach(item => item.classList.remove("active"));
  }
}

// clear this active class of a recently added message 
//* A stand-alone function is needed because this.list would have an undefined value at the inception which interferes with chat history loading from the database.

const chatList = document.querySelector(".chat-list");
export function clearCurrentActiveState() {
    chatList.querySelectorAll(".active")
    .forEach(item => item.classList.remove("active"));   
  }

