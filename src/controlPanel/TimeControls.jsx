import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


const TimeControls = ({ controlSocket }) => {
  const [newTime, setNewTime] = useState();


  const handleTimeSubmission = (e) => {
    e.preventDefault();
    // I want this here but don't have the rest of the infrastructure
    // const [minutes, seconds] = newTime.split(':');
    controlSocket.setTime(Number(newTime * 60));
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

      {
        /* probably want it so that if there is no time in state
        it sets state and then continues */
      }
      <button
        type="button"
        onClick={() => controlSocket.startTime()}
      >
        Start Time
      </button>
      <button
        type="button"
        onClick={() => controlSocket.pauseTime()}
      >
        Pause Time
      </button>
    </div>
  );
};

TimeControls.propTypes = {
  controlSocket: PropTypes.shape({
    startTime: PropTypes.func,
    setTime: PropTypes.func,
    pauseTime: PropTypes.func,
  }).isRequired,
};

export default TimeControls;
