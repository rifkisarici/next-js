import React from 'react';

const ButtonWithProgress = props => {
  const { onClick, pendingApiCall, text, className, disabled } = props;

  return (
    <button className={className || 'btn btn-primary'}
      onClick={(e) => { e.preventDefault(); onClick() }}
      //onClick={onClick}
      disabled={disabled}>
      {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} {text}
    </button>
  );
};

export default ButtonWithProgress;