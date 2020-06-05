import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


// const CommandConsoleDiv = styled.div`
//   grid-column: 2 / 3;
//   grid-row: 3;
//   text-align: center;
// `;

const TimeControls = ({ timeControlSocket }) => {
  const [newTime, setNewTime] = useState();


  // const {
  //   startTime,
  // } = timeControlSocket;

  const handleTimeSubmission = (e) => {
    e.preventDefault();
    // I want this here but don't have the rest of the infrastructure
    // const [minutes, seconds] = newTime.split(':');
    timeControlSocket.setTime(Number(newTime * 60));
  };

  return (
    <div>
      <form onSubmit={handleTimeSubmission}>
        <label htmlFor="time">
          Time in Minutes:
          <input
            type="text"
            name="time"
            onChange={(e) => setNewTime(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Set Time"
          onSubmit={handleTimeSubmission}
        />
      </form>

      <button
        type="button"
        onClick={() => timeControlSocket.startTime()}
      >
        Start Time
      </button>
      <button
        type="button"
        onClick={() => timeControlSocket.pauseTime()}
      >
        Pause Time
      </button>
    </div>
  );
};

TimeControls.propTypes = {
  timeControlSocket: PropTypes.shape({
    startTime: PropTypes.func,
    setTime: PropTypes.func,
    pauseTime: PropTypes.func,
  }).isRequired,
};

export default TimeControls;
