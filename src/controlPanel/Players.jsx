import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerVoteButton from './PlayerVoteButton';

const PlayersDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;


const Players = ({ allPlayers, socket }) => {

  // const handleTimeSubmission = (e) => {
  // };
  const voteCastCallback = (player) => {
    console.log(player);
  };

  // useEffect(() => {

  // });

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
  socket: PropTypes.shape({}).isRequired,
};

export default Players;
