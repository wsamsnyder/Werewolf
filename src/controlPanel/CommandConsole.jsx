import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CommandSocket from './commandSocket';
import TimeControls from './TimeControls';


const CommandConsoleDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  text-align: center;
`;

const CommandConsole = ({ connection, moderator }) => {
  const [players, setPlayers] = useState([]);
  const [time, setTime] = useState('');
  const [timeControlSocket, setTimeControlSocket] = useState({});
  // const [socket, setSocket] = useState('');

  const timeCallback = (newTime) => setTime(newTime);

  const playerListCallback = (allPlayers) => setPlayers(allPlayers);

  // let timeControlSocket;

  useEffect(() => {
    const newCommandSocket = new CommandSocket(connection);
    // listeners independent of emits, doesn't return anything
    newCommandSocket.initialListeners(playerListCallback, timeCallback);
    setTimeControlSocket(newCommandSocket);
  }, []);

  return (
    <CommandConsoleDiv>
      { time }
      {moderator
        ? (
          // <div>who the fuck cares</div>
          <TimeControls
            timeControlSocket={timeControlSocket}
          />
        )
        : ''}
      { players }
    </CommandConsoleDiv>
  );
};


CommandConsole.propTypes = {
  connection: PropTypes.string.isRequired,
  moderator: PropTypes.bool.isRequired,
};

export default CommandConsole;
