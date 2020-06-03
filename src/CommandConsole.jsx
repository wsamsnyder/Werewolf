import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CommandSocket from './commandSocket';

const CommandConsole = ({ connection }) => {
  const [players, setPlayers] = useState([]);
  // const [socket, setSocket] = useState('');

  useEffect(() => {
    console.log('connection: ', connection);
    const newCommandSocket = new CommandSocket(connection);
    // setSocket(newCommandSocket);

    newCommandSocket.initialListeners((playerList) => setPlayers(playerList));
  }, []);


  return (
    <div>
      { players }
    </div>
  );
};


CommandConsole.propTypes = {
  connection: PropTypes.string.isRequired,
};

export default CommandConsole;
