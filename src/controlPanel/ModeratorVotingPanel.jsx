import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModeratorVotingPanel = ({ controlSocket }) => {
  const [votingRound, setVotingRound] = useState(1);

  return (
    <div>
      <button
        type="button"
        onClick={() => controlSocket.startVote()}
      >
        {votingRound === 1 ? 'Start Voting: Nominations' : 'Start Voting: Vote to Kill'}
      </button>
      <button
        type="button"
        onClick={() => {
          setVotingRound(votingRound === 1 ? 2 : 1);
          controlSocket.endVote();
        }}
      >
        {votingRound === 1 ? 'End Voting: Nominations' : 'End Voting: Vote to Kill'}
      </button>
    </div>
  );
};

ModeratorVotingPanel.propTypes = {
  controlSocket: PropTypes.shape({
    startVote: PropTypes.func,
    endVote: PropTypes.func,
  }).isRequired,
};

export default ModeratorVotingPanel;
