import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import VoteMessage from './VoteMessage';

const HistoryDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  border-style: solid;
`;

const VoteHistory = ({ voteHistory }) => (
  <HistoryDiv>
    {
      voteHistory.length
        ? voteHistory.map((voteMessage) => (
          <VoteMessage
            key={voteMessage}
            voteMessage={voteMessage}
          />
        ))
        : null
    }
  </HistoryDiv>
);

VoteHistory.propTypes = {
  voteHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VoteHistory;
