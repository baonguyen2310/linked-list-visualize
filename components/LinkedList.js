import React from 'react';
import Node from './Node';
import Arrow from './Arrow';
import Variable from './Variable';
import calculateArrowCoordinates from '@/utils/arrowHelper';

const LinkedList = ({ data, startX = 300, startY = 100, nodeDistance = 150, nodeWidth = 120, isAdding, isRemoving, isGetting, isPrinting, currentIndex, prevIndex, newNodeValue, nodeToRemove }) => {
  const nodes = data.map((item, index) => ({
    x: startX + index * nodeDistance,
    y: startY,
    data: item,
    next: index < data.length - 1,
    isHighlighted: (isAdding || isRemoving || isGetting || isPrinting) && index === currentIndex,
    isRemoving: index === nodeToRemove
  }));

  const currentX = currentIndex === -1 ? startX - nodeDistance : startX + currentIndex * nodeDistance;
  const prevX = prevIndex === -1 ? startX - nodeDistance : startX + prevIndex * nodeDistance;

  const showNewNode = isAdding && currentIndex === data.length - 1;

  return (
    <div className="linked-list">
      <Variable x={startX - nodeDistance} y={startY} name="head" />

      {nodes.map((node, index) => (
        <Node key={index} {...node} />
      ))}

      {showNewNode && (
        <Node 
          x={startX + data.length * nodeDistance} 
          y={startY} 
          data={newNodeValue} 
          isHighlighted={true} 
          isNew={true}
        />
      )}

      {!showNewNode && (
        <Variable x={startX + nodes.length * nodeDistance} y={startY} name="null" />
      )}
      
      {showNewNode && (
        <Variable x={startX + (nodes.length + 1) * nodeDistance} y={startY} name="null" />
      )}
      
      {nodes.slice(0, -1).map((node, index) => {
        const nextNode = nodes[index + 1];
        const { sourceX, sourceY, targetX, targetY } = calculateArrowCoordinates(node, nextNode, nodeWidth);
        return (
          <Arrow
            key={index}
            sourceX={sourceX}
            sourceY={sourceY}
            targetX={targetX}
            targetY={targetY}
          />
        );
      })}
      
      <Arrow 
        sourceX={startX - nodeDistance + nodeWidth / 2} 
        sourceY={startY} 
        targetX={startX - nodeWidth / 2} 
        targetY={startY} 
      />
      
      {/* Arrow from last node to new node or null */}
      <Arrow 
        sourceX={startX + (nodes.length - 1) * nodeDistance + nodeWidth / 2} 
        sourceY={startY} 
        targetX={startX + nodes.length * nodeDistance - nodeWidth / 2} 
        targetY={startY} 
      />

      {showNewNode && (
        <Arrow 
          sourceX={startX + nodes.length * nodeDistance + nodeWidth / 2} 
          sourceY={startY} 
          targetX={startX + (nodes.length + 1) * nodeDistance - nodeWidth / 2} 
          targetY={startY} 
        />
      )}

      {(isAdding || isRemoving || isGetting || isPrinting) && (
        <Variable 
          x={currentX} 
          y={startY - 100} 
          name="current" 
          color="highlight"
        />
      )}
      {(isAdding || isRemoving || isGetting || isPrinting) && currentIndex >= 0 && (
        <Arrow 
          sourceX={currentX} 
          sourceY={startY - 70} 
          targetX={currentX} 
          targetY={startY - 30} 
          color="highlight"
        />
      )}

      {isRemoving && prevIndex >= 0 && (
        <Variable 
          x={prevX} 
          y={startY - 100} 
          name="prev" 
          color="secondary"
        />
      )}
      {isRemoving && prevIndex >= 0 && (
        <Arrow 
          sourceX={prevX} 
          sourceY={startY - 70} 
          targetX={prevX} 
          targetY={startY - 30} 
          color="secondary"
        />
      )}
    </div>
  );
};

export default LinkedList;
