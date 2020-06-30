import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerVoteButton from './PlayerVoteButton';

const PlayersDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;


const Players = ({ allPlayers, controlSocket }) => {
  const voteCastCallback = (player) => {
    controlSocket.vote(player);
    console.log(player);
  };

  return (
    <PlayersDiv>
      {
        allPlayers.map((player) => (
          <PlayerVoteButton
            key={player}
            player={player}
            voteCastCallback={voteCastCallback}
          />
        ))
      }
    </PlayersDiv>
  );
};

// Players.defaultProps = {
// };

Players.propTypes = {
  allPlayers: PropTypes.arrayOf(PropTypes.string).isRequired,
  controlSocket: PropTypes.shape({
    vote: PropTypes.func,
  }).isRequired,
};

export default Players;
