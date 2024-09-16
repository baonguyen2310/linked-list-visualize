const calculateArrowCoordinates = (sourceNode, targetNode, nodeWidth = 120) => {
  const sourceX = sourceNode.x + nodeWidth / 2; // End of the source node
  const sourceY = sourceNode.y;
  const targetX = targetNode.x - nodeWidth / 2; // Start of the target node
  const targetY = targetNode.y;

  return { sourceX, sourceY, targetX, targetY };
};

export default calculateArrowCoordinates;
