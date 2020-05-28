import React, { useState } from 'react';

// import Socket from './sockets';
import { api } from './lib';
import ChatRoom from './ChatRoom';

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
        });
        setSockets(rooms);
      });
  };

  const joinGameRoom = () => {
    // not implemented atm
    // api.joinGameRoom('sam');
  };


  return (
    <div>
      <button type="button" onClick={createGameRoom}>Create Room</button>
      <button type="button" onClick={joinGameRoom}>Join Room</button>
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
