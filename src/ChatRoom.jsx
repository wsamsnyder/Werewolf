import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Socket from './sockets';
import ChatMessage from './ChatMessage';

const ChatRoomDiv = styled.div`
  grid-column: ${(props) => props.room === 'townsPeople' ? '1' : '3'};
  grid-row: ${(props) => props.room === 'townsPeople' || props.moderator === 'moderator' ? '2 / 5' : `${props.location + 2}`};
  border-style: solid;
`;


// template for chatroom
// I'm going to use 'location' to seperate out the divs
const ChatRoom = ({ roomData, location, moderator }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  console.log(roomData.roomName);

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

    newSocket.joinNamespace((receivedMessage) => {
      setMessages((previousMessages) => [...previousMessages, receivedMessage]);
    });
  }, []);


  // this can be passed down to an input component
  const sendMessage = (e) => {
    e.preventDefault();
    socket.sendMessage(newMessage);
    setNewMessage('');
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') sendMessage(e);
  };

  return (
    <ChatRoomDiv className={roomData.roomName} location={location} moderator={moderator}>
      <div>
        {roomName}
      </div>
      <div>
        {
          messages.map((message, idx) => (
            <ChatMessage
              // prob want to find a better way of doing this key.
              // Each message would need a unique id
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              username={message.username}
              message={message.message}
            />
          ))
        }
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <textarea
            className="newMessage"
            type="text"
            value={newMessage}
            onSubmit={sendMessage}
            // defaultValue="type message"
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => keyPressed(e)}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </ChatRoomDiv>
  );
};

// need to do props validation

ChatRoom.propTypes = {
  roomData: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.number.isRequired,
  moderator: PropTypes.bool.isRequired,
};

export default ChatRoom;
