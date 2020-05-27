import React, { useState } from 'react';
// import io from 'socket.io-client';

import Socket from './sockets';
import { api } from './lib';
import ChatRoom from './chatRoom';

// const socket = io.connect();

// socket.on('news', (data) => {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

const App = () => {
  // these channels should be moved to the messaging module
  const [townsPeopleChat, setTownsPeopleChat] = useState([]);
  const [wolves, setWolvesChat] = useState([]);
  const [doctor, setDoctorChat] = useState([]);
  const [seer, setSeerChat] = useState([]);
  const [sockets, setSockets] = useState({});
  const [room, setRoom] = useState('');
  // let [townsPeopleChat, setTownsPeopleChat] = useState([]);

  // make a new room with the namespace of the id returned
  const createGameRoom = () => {
    api.createGameRoom('sam')
      .then(({ gameId, chatRooms }) => {
        setRoom(gameId);
        console.log(chatRooms);
        chatRooms.forEach(({ roomName, roomId }) => {
          if (roomName === 'townsPeople') {
            const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
            setSockets((allSockets) => ({ ...allSockets, townsPeople: chat }));
            chat.joinNamespace((message) => (
              setTownsPeopleChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (roomName === 'wolves') {
            const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
            setSockets((allSockets) => ({ ...allSockets, wolves: chat }));
            chat.joinNamespace((message) => (
              setWolvesChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (roomName === 'doctor') {
            const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
            setSockets((allSockets) => ({ ...allSockets, doctor: chat }));
            chat.joinNamespace((message) => (
              setDoctorChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (roomName === 'seer') {
            const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
            setSockets((allSockets) => ({ ...allSockets, seer: chat }));
            chat.joinNamespace((message) => (
              setSeerChat((previousMessages) => [...previousMessages, message])
            ));
          }
        });
      });
  };

  const sendMessage = () => {
    sockets.townsPeople.sendMessage('hello There');
  };

  return (
    <div>
      <button type="button" onClick={createGameRoom}>Create Namespace</button>
      <div>{townsPeopleChat}</div>
      <div>{room}</div>
      <ChatRoom roomName={sockets} />
      <button type="button" onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
