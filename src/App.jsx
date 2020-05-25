import React from 'react';
import io from 'socket.io-client';

import { api } from './lib';

// const socket = io.connect();

// socket.on('news', (data) => {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

const App = () => {
  let room;

  // room.on('connect', () => {
  //   room.emit('hello there');
  // });

  // socket.on('news', (data) => {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'the dark side' });
  // });

  // make a new room with the namespace of the id returned
  const createNamespace = () => {
    api.createRoom('sam')
      .then((roomID) => {
        console.log(roomID);
        room = io.connect(`/${roomID}`);

        room.on('connect', () => {
          room.emit('hello there');
        });

        room.on('a message', (data) => {
          console.log(data.message);
        });
      });
  };

  return (
    <div>
      <button type="button" onClick={createNamespace}>Create Room</button>
    </div>
  );
};

export default App;
