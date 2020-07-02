import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CommandSocket from './commandSocket';
import TimeControls from './TimeControls';
import Players from './Players';
import ModeratorVotingPanel from './ModeratorVotingPanel';
import VoteTally from './VoteTally';
import VoteHistory from './VoteHistory';


const CommandConsoleDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 3;
  text-align: center;
`;

const CommandConsole = ({
  username,
  connection,
  moderator,
  controlSocketIdentity,
  roleAssignmentCb,
}) => {
  const [players, setPlayers] = useState([]);
  const [time, setTime] = useState(0);
  const [controlSocket, setControlSocket] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [voteHistory, setVoteHistory] = useState([]);
  const [voteTally, setVoteTally] = useState({});

  const timeCallback = (newTime) => setTime(newTime);
  const playerListCallback = (allPlayers) => setPlayers(allPlayers);
  const updateVoteTallyCallback = (tally, history) => {
    setVoteTally(tally);
    setVoteHistory((oldHistory) => oldHistory.push(history));
  };

  useEffect(() => {
    const newCommandSocket = new CommandSocket(connection, controlSocketIdentity, username);
    newCommandSocket.initialListeners(playerListCallback, timeCallback, roleAssignmentCb, updateVoteTallyCallback);
    setControlSocket(newCommandSocket);
  }, []);

  const startGame = () => {
    setGameStarted(true);
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
      {
        moderator
          ? (
            <>
              <TimeControls
                controlSocket={controlSocket}
              />
              <ModeratorVotingPanel
                controlSocket={controlSocket}
              />
            </>
          )
          : ''
        }
      <Players
        allPlayers={players}
        controlSocket={controlSocket}
      />
      <VoteTally
        voteTally={voteTally}
      />
      <VoteHistory
        voteHistory={voteHistory}
      />
    </CommandConsoleDiv>
  );
};

CommandConsole.defaultProps = {
  controlSocketIdentity: '',
};

CommandConsole.propTypes = {
  username: PropTypes.string.isRequired,
  roleAssignmentCb: PropTypes.func.isRequired,
  controlSocketIdentity: PropTypes.string,
  connection: PropTypes.string.isRequired,
  moderator: PropTypes.bool.isRequired,
};

export default CommandConsole;
