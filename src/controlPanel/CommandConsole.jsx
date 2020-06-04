import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CommandSocket from './commandSocket';

const CommandConsoleDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  text-align: center;
`;

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
    <CommandConsoleDiv>
      { players }
    </CommandConsoleDiv>
  );
};


CommandConsole.propTypes = {
  connection: PropTypes.string.isRequired,
};

export default CommandConsole;
