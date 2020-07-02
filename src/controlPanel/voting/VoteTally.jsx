import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayerButton = styled.button`
  border: 2px solid black;
  border-radius: 25px;
`;

const PlayerVoteButton = ({ player, voteCastCallback }) => (
  <PlayerButton
    onClick={() => voteCastCallback(player)}
  >
    {player}
  </PlayerButton>
);

PlayerVoteButton.propTypes = {
  player: PropTypes.string.isRequired,
  voteCastCallback: PropTypes.func.isRequired,
};

export default PlayerVoteButton;
