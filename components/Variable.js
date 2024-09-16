import React from 'react';

const Variable = ({ x, y, w = 120, h = 60, name, color = 'default' }) => {
  const halfW = w / 2;
  const halfH = h / 2;

  return (
    <div
      className={`variable ${color}`}
      style={{
        left: x - halfW,
        top: y - halfH,
        width: w,
        height: h,
      }}
    >
      {name}
    </div>
  );
};

export default Variable;
