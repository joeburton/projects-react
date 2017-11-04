import React from 'react';

export default ({onClick, label}) => (
  <button onClick={onClick}>
    {label}
  </button>
);
