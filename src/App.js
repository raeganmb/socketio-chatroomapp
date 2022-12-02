import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io();

function App() {
  const [message, setMessage] = useState("");
  const [chatbox, setChatbox] = useState([]);

  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("join", (data) => {
      console.log(data);
    });

    // socket.on("usercount", (data) => {
    //   console.log(data);
    // });

    socket.on("incoming message", (data) => {
      setChatbox((msgs) => [...msgs, data]);
    });

    return () => {
      socket.off("welcome");
      socket.off("join");
      // socket.off("usercount");
      socket.off("incoming message");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setChatbox((msgs) => [...msgs, message]);
    socket.emit("new message", message);
    setMessage("");
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="chatbox">
        {chatbox.map((msg, idx) => (
          <p key={`${msg}-${idx}`}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
