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

const CommandConsole = ({
  connection,
  moderator,
  controlSocketIdentity,
  roleAssignmentCb,
}) => {
  const [players, setPlayers] = useState([]);
  const [time, setTime] = useState(0);
  const [controlSocket, setControlSocket] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  // const [socket, setSocket] = useState('');

  const timeCallback = (newTime) => setTime(newTime);

  const playerListCallback = (allPlayers) => setPlayers(allPlayers);

  // let timeControlSocket;

  useEffect(() => {
    const newCommandSocket = new CommandSocket(connection, controlSocketIdentity);
    // console.log(newCommandSocket);
    // listeners independent of emits, doesn't return anything
    newCommandSocket.initialListeners(playerListCallback, timeCallback, roleAssignmentCb);
    // timeControlSocket = newCommandSocket;
    setControlSocket(newCommandSocket);
  }, []);

  const startGame = () => {
    controlSocket.startGame();
  };

  return (
    <CommandConsoleDiv>
      {
        !gameStarted && moderator
          ? <button type="button" onClick={() => startGame()}>Start Game</button>
          : ''
      }
      <div>
        { `${(time / 60).toString().split('.')[0]}:${(time % 60).toString().padStart(2, '0')}`}
      </div>
      {moderator
        ? (
          <TimeControls
            controlSocket={controlSocket}
          />
        )
        : ''}
      { players.map((player) => (
        <div>
          { player }
        </div>
      )) }
    </CommandConsoleDiv>
  );
};

CommandConsole.defaultProps = {
  controlSocketIdentity: '',
};

CommandConsole.propTypes = {
  roleAssignmentCb: PropTypes.func.isRequired,
  controlSocketIdentity: PropTypes.string,
  connection: PropTypes.string.isRequired,
  moderator: PropTypes.bool.isRequired,
};

export default CommandConsole;
