import React from 'react';
import './loadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingIndicator;
