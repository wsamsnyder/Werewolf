import React from 'react';
import PropTypes from 'prop-types';

const ModeratorVotingPanel = ({ controlSocket }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => controlSocket.startVote()}
      >
        Start Voting: Round 1
      </button>
    </div>
  );
};

ModeratorVotingPanel.propTypes = {
  controlSocket: PropTypes.shape({
    startVote: PropTypes.func,
  }).isRequired,
};

export default ModeratorVotingPanel;