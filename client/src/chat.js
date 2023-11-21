import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list)=>[...list,messageData])
      setCurrentMessage("");
    }
  };
useEffect(()=>{
socket.on("received_message",(data)=>{
    setMessageList((list) => [...list, data]);
    console.log(data)
});
},[socket]);
  return (
    <div className="window">
      <div className='header'>
        <p>Live Chat</p>
      </div>
      <div className='body'>
        <ScrollToBottom className='message-conatiner'>
    {messageList.map((messageContent)=>{
        return (
            <div className='message' id={username===messageContent.author ? "you":"other"}>
                <div>
                    <div className='message-content'>
                        <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p id="author">{messageContent.author}</p>
                        <p id="time">{messageContent.time}</p> 
                    </div>
                </div>
            </div>
        )
    })}
    </ScrollToBottom>
      </div>
      <div className='footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='hey...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event=>{
            event.key==="Enter" && sendMessage();
          })}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
