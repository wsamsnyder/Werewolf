import React, { useState } from 'react';
// import io from 'socket.io-client';

import Socket from './sockets';
import { api } from './lib';

// const socket = io.connect();

// socket.on('news', (data) => {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

const App = () => {
  let namespace;
  const [namespaceChat, setNamespaceChat] = useState([]);
  // let [townsPeopleChat, setTownsPeopleChat] = useState([]);

  // make a new room with the namespace of the id returned
  const createNamespace = () => {
    api.createNamespace('sam')
      .then((roomID) => {
        namespace = new Socket(roomID);
        namespace.joinNamespace((message) => (
          // may make this perm if it's something that will be done often
          // eslint-disable-next-line no-shadow
          setNamespaceChat((namespaceChat) => [...namespaceChat, message])
        ));
      });
  };

  return (
    <div>
      <button type="button" onClick={createNamespace}>Create Namespace</button>
    </div>
  );
};

export default App;
