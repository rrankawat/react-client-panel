import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, messageType }) => {
  return (
    <div
      className={`alert alert-${
        messageType === 'success' ? 'success' : 'danger'
      }`}
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default Alert;
