import React, { useState, useEffect } from 'react';
import Socket from './sockets';

import ChatMessage from './chatMessage';

// template for chatroom
const chatRoom = ({ roomData }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const {
    roomId,
    username,
    userId,
    gameId,
    roomName,
  } = roomData;

  useEffect(() => {
    const newSocket = new Socket(roomId, 'sam', roomId, gameId, roomName);
    setSocket(newSocket);

    newSocket.joinNamespace((message) => {
      console.log('chatRoom: join namespace');
      setMessages((previousMessages) => [...previousMessages, message]);
    });
  }, []);


  // this can be passed down to an input component
  const sendMessage = (message) => {
    socket.sendMessage('hello There');
  };

  return (
    <div>
      {
        messages.map((message, idx) => (
          <ChatMessage
            // eslint-disable-next-line react/no-array-index-key
            // prob want to find a better way of doing this key
            key={idx}
            username={message.username}
            message={message.message}
          />
        ))
      }
      <button type="button" onClick={sendMessage}>
        Send to
        {roomName}
        : hello there
      </button>
    </div>
  );
};

// need to do props validation

export default chatRoom;
