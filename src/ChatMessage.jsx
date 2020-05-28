import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({ username, message }) => (
  <div>
    {username}
    {': '}
    {message}
  </div>

);

ChatMessage.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChatMessage;
