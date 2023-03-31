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
            <li class="list-group-item">
                <span class="username">${data.username}</span>:
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
    this.list.innerHTML += html;
  }
}

