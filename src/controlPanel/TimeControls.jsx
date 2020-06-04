import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


// const CommandConsoleDiv = styled.div`
//   grid-column: 2 / 3;
//   grid-row: 3;
//   text-align: center;
// `;

const TimeControls = ({ timeControlSocket }) => {

  return (
    <div>
      <button
        type="button"
        onClick={timeControlSocket.startTime}
      >
        Start Time
      </button>
    </div>
  );
};


TimeControls.propTypes = {
  timeControlSocket: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TimeControls;
