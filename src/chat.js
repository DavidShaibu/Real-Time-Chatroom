// adding new chat documents
// setting up a real-time listener to get new chats
// updating the username
// Updting the room

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
  fromDate,
  Timestamp,
  getDoc,
  setDoc,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";

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


// dom query
const newhChatForm = document.querySelector(".new-chat");

export class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    let time = serverTimestamp();
    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: time == null ? null : time,
    };
    // save the chat document
    const response = await addDoc(this.chats, chat);
    return response;
  }
  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          // update the ui with instant chats
          callback(change.doc.data());
        }

        if (change.type === "added" && !newhChatForm.message.value) {
          // update the ui with chat history
          callback(change.doc.data());
        }
      });
    });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
  }
}
