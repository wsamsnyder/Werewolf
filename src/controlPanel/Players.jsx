import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerVoteButton from './PlayerVoteButton';

const PlayerDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;


const Players = ({ allPlayers, voteCallback }) => {
  const [hasVoted, setHasVoted] = useState(false);

  // const handleTimeSubmission = (e) => {
  // };

  return (
    <PlayerDiv>
      {
        hasVoted
          ? allPlayers.map((player) => (
            <PlayerVoteButton
              key={player}
              player={player}
            />
          ))
          : ''
      }
    </PlayerDiv>
  );
};

Players.propTypes = {
  allPlayers: PropTypes.arrayOf(PropTypes.string).isRequired,
  voteCallback: PropTypes.func.isRequired,
};

export default Players;
