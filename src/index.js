import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsjUzEwfR-lLJGYWrprMV7Eyd-tfnn0zA",
  authDomain: "real-time-chat-95e55.firebaseapp.com",
  projectId: "real-time-chat-95e55",
  storageBucket: "real-time-chat-95e55.appspot.com",
  messagingSenderId: "652865447063",
  appId: "1:652865447063:web:74797561f550be2739b5d2",
  measurementId: "G-PVQQT8QFTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// dom queries
const chatList = document.querySelector(".chat-list");
const newhChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

// add a new chat
newhChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newhChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newhChatForm.reset())
    .catch((err) => console.log(err.message));
});

// update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //update username in the chatroom
  const newName = e.target.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show and hide the update message feedback
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

// update the chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : "Anon";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("gaming", username);

// get chats and render
chatroom.getChats((data) => chatUI.render(data));
