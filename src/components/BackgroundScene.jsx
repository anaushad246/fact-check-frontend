import React from 'react';

const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeIn" aria-hidden="true" role="presentation">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default BackgroundScene;