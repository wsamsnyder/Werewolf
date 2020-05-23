import React from 'react';
import io from 'socket.io-client';

const socket = io.connect();

// socket.on('news', (data) => {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

const App = () => {
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

  return (
    <div>
      Hello There
    </div>
  );
};

export default App;
