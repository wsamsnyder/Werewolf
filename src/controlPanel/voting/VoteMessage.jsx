import React from 'react';
import PropTypes from 'prop-types';

const VoteMessage = ({ voteMessage }) => (
  <div>
    {voteMessage}
  </div>
);

VoteMessage.propTypes = {
  voteMessage: PropTypes.string.isRequired,
};

export default VoteMessage;
