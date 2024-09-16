import React from 'react';

const Arrow = ({ sourceX, sourceY, targetX, targetY, color = 'default', thickness = 2 }) => {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  const arrowHeadSize = 10;
  const arrowHeadAngle = Math.PI / 6; // 30 degrees

  return (
    <svg className="arrow-container">
      <defs>
        <marker
          id={`arrowhead-${color}`}
          markerWidth={arrowHeadSize}
          markerHeight={arrowHeadSize}
          refX={arrowHeadSize}
          refY={arrowHeadSize / 2}
          orient="auto"
        >
          <path
            d={`M0,0 L0,${arrowHeadSize} L${arrowHeadSize},${arrowHeadSize / 2} z`}
            className={`arrow-head ${color}`}
          />
        </marker>
      </defs>
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        className={`arrow-line ${color}`}
        strokeWidth={thickness}
        markerEnd={`url(#arrowhead-${color})`}
      />
    </svg>
  );
};

export default Arrow;
