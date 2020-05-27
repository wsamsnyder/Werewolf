import React, { useState } from 'react';

// import Socket from './sockets';
import { api } from './lib';
import ChatRoom from './chatRoom';

const App = () => {
  const [sockets, setSockets] = useState([]);
  const [room, setRoom] = useState('');

  // make a new room with the namespace of the id returned
  const createGameRoom = () => {
    api.createGameRoom('sam')
      .then(({ gameId, chatRooms }) => {
        setRoom(gameId);
        const rooms = [];
        chatRooms.forEach(({ roomName, roomId }) => {
          rooms.push({
            roomId,
            username: 'username',
            userId: roomId,
            gameId,
            roomName,
          });

          // if (roomName === 'townsPeople') {
          //   const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
          //   setSockets((allSockets) => ([ ...allSockets, townsPeople: chat ]));
          //   chat.joinNamespace((message) => (
          //     setTownsPeopleChat((previousMessages) => [...previousMessages, message])
          //   ));
          // }
          // if (roomName === 'wolves') {
          //   const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
          //   setSockets((allSockets) => ([ ...allSockets, wolves: chat ]));
          //   chat.joinNamespace((message) => (
          //     setWolvesChat((previousMessages) => [...previousMessages, message])
          //   ));
          // }
          // if (roomName === 'doctor') {
          //   const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
          //   setSockets((allSockets) => ([ ...allSockets, doctor: chat ]));
          //   chat.joinNamespace((message) => (
          //     setDoctorChat((previousMessages) => [...previousMessages, message])
          //   ));
          // }
          // if (roomName === 'seer') {
          //   const chat = new Socket(roomId, 'sam', roomId, gameId, roomName);
          //   setSockets((allSockets) => ([ ...allSockets, seer: chat ]));
          //   chat.joinNamespace((message) => (
          //     setSeerChat((previousMessages) => [...previousMessages, message])
          //   ));
          // }
        });
        setSockets(rooms);
      });
  };

  return (
    <div>
      <button type="button" onClick={createGameRoom}>Create Namespace</button>
      <div>{room}</div>
      {
        sockets.map((roomData) => (
          <ChatRoom
            key={roomData.roomId}
            roomData={roomData}
          />
        ))
      }
    </div>
  );
};

export default App;
