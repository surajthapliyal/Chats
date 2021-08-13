import React from "react";

export default function Form(props) {
  const { sendMessage, message, handleChange ,handleSelectFile} = props;
  return (
    <form class="myForm">
    
      <input
        type="text"
        value={message}
        className="msgInp"
        onChange={handleChange}
        placeholder="Type a message"
      ></input>

      <label className="fileButton">
        <i className="fa fa-paperclip" aria-hidden="true"/>
        <input type="file" size="60" onChange={handleSelectFile}/>
      </label>


      <button className="btn" onClick={sendMessage}>
        <div className="arrow">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
      </button>

    </form>
  );
}
