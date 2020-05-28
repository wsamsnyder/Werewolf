import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Socket from './sockets';

import ChatMessage from './ChatMessage';

// template for chatroom
const ChatRoom = ({ roomData }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  const {
    roomId,
    username = 'sam',
    userId,
    gameId,
    roomName,
  } = roomData;

  useEffect(() => {
    const newSocket = new Socket(roomId, username, userId, gameId, roomName);
    setSocket(newSocket);

    newSocket.joinNamespace((message) => {
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

ChatRoom.propTypes = {
  roomData: PropTypes.objectOf(PropTypes.string).isRequired
  ,
};

export default ChatRoom;
