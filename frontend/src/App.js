import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

var ls = require('local-storage');
let onlineUsers = [];

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
    
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="join-chat-container">
          <h3>chats</h3>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(event) => {
              setUsername(event.target.value);
              onlineUsers.push(event.target.value);
              ls.set('onlineUsers', onlineUsers);

            }}
          />
          <select onChange={(e) => {
            setRoom(e.target.value)
          }}>
            <option value="unselected">Select a Channel</option>
            <option value="general">General</option>
            <option value="fun">Fun</option>
            <option value="other">Other</option>
            
          </select>
         
          <button onClick={joinRoom}>Join This Channel</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;

