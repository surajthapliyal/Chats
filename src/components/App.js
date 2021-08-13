import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../App.css";
import Form from "./form";
import Header from "./header";
import ImageToSend from "./ImageToSend";

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("your id", (id) => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      receivedMessage(message);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (file) {
      const messageObject = {
        id: yourID,
        type: "file",
        body: file,
        fileType: file.type,
        fileName: file.name,
      };
      // now removing the file name which gets set on the input :
      setMessage("");
      // removing file var's value :
      setFile();

      // sending file by raising event:
      socketRef.current.emit("send message", messageObject);
    } else {
      const messageObject = {
        body: message,
        id: yourID,
      };
      // refreshing the input area for the message :
      setMessage("");
      socketRef.current.emit("send message", messageObject);
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSelectFile(e) {
    setMessage(e.target.files[0].name);
    // setting file var's value to the selected file
    setFile(e.target.files[0]);
  }

  function renderMessages(message, index) {
    if (message.type === "file") {
      const blob = new Blob([message.body], { type: message.type });

      if (message.id === yourID) {
        return (
          <div key={index} className="myrow">
            <ImageToSend fileName={message.fileName} blob={blob} />
          </div>
        );
      }
      return (
        <div key={index} className="partnerrow">
          <ImageToSend fileName={message.fileName} blob={blob} />
        </div>
      );
    }
    if (message.id === yourID) {
      if (message.body === "") {
        return;
      }
      return (
        <div key={index} className="myrow">
          <div className="mymessage">{message.body}</div>
        </div>
      );
    }
    if (message.id !== yourID) {
      if (message.body === "") {
        return;
      }
      return (
        <div key={index} className="partnerrow">
          <div className="partnermessage">{message.body}</div>
        </div>
      );
    }
  }

  return (
    <div className="page">
      <div className="container">
        <Header />
        <div className="messagesBox">{messages.map(renderMessages)}</div>
        <Form
          sendMessage={sendMessage}
          message={message}
          handleSelectFile={handleSelectFile}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
export default App;
