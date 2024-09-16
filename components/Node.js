import React from 'react';

const Node = ({ x, y, w = 120, h = 60, data, isHighlighted, isNew, isRemoving }) => {
  const halfW = w / 2;
  const halfH = h / 2;

  return (
    <div
      className={`node ${isHighlighted ? 'highlighted' : ''} ${isNew ? 'new' : ''} ${isRemoving ? 'removing' : ''}`}
      style={{
        left: x - halfW,
        top: y - halfH,
        width: w,
        height: h,
      }}
    >
      <div className="node-data">
        Data: {data}
      </div>
      <div className="node-next">
        Next
      </div>
    </div>
  );
};

export default Node;
