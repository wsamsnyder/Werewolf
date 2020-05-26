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
  // let namespace;
  const [townsPeopleChat, setTownsPeopleChat] = useState([]);
  // these channels should be moved to the messaging module
  const [wolvesChat, setWolvesChat] = useState([]);
  const [doctorChat, setDoctorChat] = useState([]);
  const [seerChat, setSeerChat] = useState([]);
  const [sockets, setSockets] = useState({});
  const [room, setRoom] = useState('');
  // let [townsPeopleChat, setTownsPeopleChat] = useState([]);

  // make a new room with the namespace of the id returned
  const createNamespace = () => {
    api.createNamespace('sam')
      .then((namespaces) => {
        setRoom(namespaces[0].id);
        namespaces.forEach(({ chatName, id }) => {
          if (chatName === 'townsPeopleChat') {
            const chat = new Socket(id, 'sam');
            setSockets((allSockets) => ({ ...allSockets, townsPeople: chat }));
            chat.joinNamespace((message) => (
              setTownsPeopleChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (chatName === 'wolvesChat') {
            const chat = new Socket(id, 'sam');
            setSockets((allSockets) => ({ ...allSockets, wolves: chat }));
            chat.joinNamespace((message) => (
              setWolvesChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (chatName === 'doctorChat') {
            const chat = new Socket(id, 'sam');
            setSockets((allSockets) => ({ ...allSockets, doctor: chat }));
            chat.joinNamespace((message) => (
              setDoctorChat((previousMessages) => [...previousMessages, message])
            ));
          }
          if (chatName === 'seerChat') {
            const chat = new Socket(id, 'sam');
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
      <button type="button" onClick={createNamespace}>Create Namespace</button>
      <button type="button">{townsPeopleChat}</button>
      <div>{room}</div>
      <ChatRoom roomName={sockets} />
      <button type="button" onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
