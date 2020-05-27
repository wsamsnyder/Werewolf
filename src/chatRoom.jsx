import React, { useState } from 'react';
import Socket from './sockets';

// template for chatroom
const chatRoom = ({
  roomId,
  username,
  userId,
  gameId,
  roomName,
}) => {
  const [messages, setMessages] = useState([]);

  const socket = new Socket(roomId, 'sam', roomId, gameId, roomName);

  socket.joinNamespace((message) => {
    setMessages((previousMessages) => [message, ...previousMessages]);
  });

  // const sendMessage = () => {
  //   sockets.townsPeople.sendMessage('hello There');
  // };

  return (
    <div>
      something random
    </div>
  );
};

// need to do props validation

export default chatRoom;
