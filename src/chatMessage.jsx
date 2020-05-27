import React from 'react';

const chatMessage = ({ username, message }) => (
  <div>
    {username}:{message}
  </div>

);

export default chatMessage;
