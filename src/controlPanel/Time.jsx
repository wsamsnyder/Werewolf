import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Time = ({ socket }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log(socket);
    socket.setTimeListener((newTime) => setTime(newTime));
  }, []);


  return (
    <div>
      { `${(time / 60).toString().split('.')[0]}:${(time % 60).toString().padStart(2, '0')}`}
    </div>
  );
};

Time.propTypes = {
  socket: PropTypes.shape({}).isRequired,
};

export default Time;
