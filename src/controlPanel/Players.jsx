import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


const Players = ({ allPlayers, voteCallback }) => {
  const [hasVoted, setHasVoted] = useState();

  // const handleTimeSubmission = (e) => {
  // };

  return (
    <button>
    </button>
  );
};

Players.propTypes = {
  allPlayers: PropTypes.arrayOf(PropTypes.string).isRequired,
  voteCallback: PropTypes.func.isRequired,
};

export default Players;
