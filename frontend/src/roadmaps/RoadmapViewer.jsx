import { useState, useEffect, useContext, useMemo } from 'react';
import { ReactFlow, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import { AuthContext } from '../auth/Authcontext';
import Sidebar from '../components/Sidebar';
import { allRoadmapsLink } from '../links';

const generateNodesAndEdges = (data) => {
  let nodes = [];
  let edges = [];
  const centerX = 520;
  const minStageSpacingY = 280;
  const skillRowGap = 92;
  const stageToSkillGapY = 110;
  const maxRowsPerSide = 5;
  const baseSkillOffsetX = 250;
  const sideColumnGapX = 180;
  const stageNodeWidth = 220;
  const skillNodeWidth = 170;
  const stageNodeMinHeight = 84;
  const skillNodeMinHeight = 76;
  const stageLineHeight = 20;
  const skillLineHeight = 17;
  const topPadding = 40;
  const bottomPadding = 220;
  let currentY = 0;
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = 0;

  const getEstimatedNodeHeight = ({ text = '', width, minHeight, charsPerLine, lineHeight, verticalPadding }) => {
    const safeText = String(text || '').trim();
    const lines = Math.max(1, Math.ceil(safeText.length / Math.max(1, charsPerLine)));
    return Math.max(minHeight, lines * lineHeight + verticalPadding);
  };

  const trackBounds = (x, y, width, height) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  };

  data.stages.forEach((stage, stageIndex) => {
    const stageId = `stage-${stageIndex}`;
    const stageY = currentY;
    const leftSkills = stage.skills.filter((_, index) => index % 2 === 0);
    const rightSkills = stage.skills.filter((_, index) => index % 2 !== 0);

    const leftColumns = Math.max(1, Math.ceil(leftSkills.length / maxRowsPerSide));
    const rightColumns = Math.max(1, Math.ceil(rightSkills.length / maxRowsPerSide));

    const effectiveLeftRows = leftSkills.length === 0 ? 0 : Math.min(maxRowsPerSide, leftSkills.length);
    const effectiveRightRows = rightSkills.length === 0 ? 0 : Math.min(maxRowsPerSide, rightSkills.length);
    const maxRowsThisStage = Math.max(effectiveLeftRows, effectiveRightRows, 1);
    // Stage header node
    nodes.push({
      id: stageId,
      position: { x: centerX, y: stageY },
      data: { label: stage.stage },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: {
        width: stageNodeWidth,
        background: stageIndex % 2 === 0 ? '#4caf50' : '#2196f3', // alternating colors
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        textAlign: 'center',
      }
    });
    const stageNodeHeight = getEstimatedNodeHeight({
      text: stage.stage,
      width: stageNodeWidth,
      minHeight: stageNodeMinHeight,
      charsPerLine: 18,
      lineHeight: stageLineHeight,
      verticalPadding: 24,
    });
    trackBounds(centerX, stageY, stageNodeWidth, stageNodeHeight);

    // Skill nodes (split left/right, then distribute in columns if count is large)
    let leftCounter = 0;
    let rightCounter = 0;

    stage.skills.forEach((skill, skillIndex) => {
      const nodeId = `${stageId}-n${skillIndex}`;
      const isLeftSide = skillIndex % 2 === 0;
      const skillOrderInSide = isLeftSide ? leftCounter++ : rightCounter++;
      const columnIndex = Math.floor(skillOrderInSide / maxRowsPerSide);
      const rowIndex = skillOrderInSide % maxRowsPerSide;
      const skillY = stageY + stageToSkillGapY + rowIndex * skillRowGap;
      const horizontalOffset = baseSkillOffsetX + columnIndex * sideColumnGapX;
      const skillX = isLeftSide ? centerX - horizontalOffset : centerX + horizontalOffset;

      nodes.push({
        id: nodeId,
        position: { x: skillX, y: skillY },
        data: { label: skill },
        targetPosition: isLeftSide ? Position.Right : Position.Left,
        style: {
          background: '#f0f334',
          color: '#0a0a0a',
          border: '2px solid #0f0e0e',
          borderRadius: 6,
          padding: '8px 10px',
          width: skillNodeWidth,
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: 1.25,
          fontSize: 14,
        }
      });
      const skillNodeHeight = getEstimatedNodeHeight({
        text: skill,
        width: skillNodeWidth,
        minHeight: skillNodeMinHeight,
        charsPerLine: 16,
        lineHeight: skillLineHeight,
        verticalPadding: 20,
      });
      trackBounds(skillX, skillY, skillNodeWidth, skillNodeHeight);
      edges.push({
        id: `${stageId}-${nodeId}`,
        source: stageId,
        target: nodeId,
        type: 'smoothstep',
        animated: true
      });
    });

    // Connect stage headers together
    if (stageIndex > 0) {
      const prevStageId = `stage-${stageIndex - 1}`;
      edges.push({
        id: `${prevStageId}-${stageId}`,
        source: prevStageId,
        target: stageId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#999', strokeWidth: 2 }
      });
    }

    const visualBlockHeight = stageToSkillGapY + (maxRowsThisStage - 1) * skillRowGap + 120;
    const widthPressure = Math.max(leftColumns, rightColumns) - 1;
    const dynamicSpacing = minStageSpacingY + widthPressure * 22;
    currentY += Math.max(dynamicSpacing, visualBlockHeight);
  });

  const leftPadding = 80;
  const shiftX = Number.isFinite(minX) && minX < leftPadding ? leftPadding - minX : 0;

  const shiftedNodes = nodes.map((node) => ({
    ...node,
    position: {
      x: node.position.x + shiftX,
      y: node.position.y + topPadding,
    }
  }));

  const contentWidth = Math.max(1000, (maxX - minX) + 160);
  const contentHeight = Math.max(760, maxY + topPadding + bottomPadding);

  return { nodes: shiftedNodes, edges, contentWidth, contentHeight };
};

const RoadmapViewer = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axios.get(allRoadmapsLink, { withCredentials: true });
        setRoadmaps(response.data.roadmaps);
      } catch (error) {
        setRoadmaps([]);
        return;
      }
    };
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    if (user?.careerRoadmap) {
      const matchingRoadmap = roadmaps.find((roadmap) => roadmap.title === user.careerRoadmap.title);
      setSelectedRoadmap(matchingRoadmap || user.careerRoadmap);
      return;
    }

    if (!selectedRoadmap && roadmaps.length > 0) {
      setSelectedRoadmap(roadmaps[0]);
    }
  }, [user?.careerRoadmap, roadmaps]);

  const graphData = useMemo(() => {
    if (!selectedRoadmap) {
      return { nodes: [], edges: [], contentWidth: 1000, contentHeight: 680 };
    }

    return generateNodesAndEdges(selectedRoadmap);
  }, [selectedRoadmap]);

  return (
    <div className='h-full w-full flex flex-col md:flex-row'>
      <Sidebar className={`hidden md:${!user ? 'hidden' : 'block'} md:basis-1/5 md:shrink-0`} />

      <div className="flex flex-1 min-w-0 flex-col min-h-[70vh] w-full">
        {/* Main area with ReactFlow */}
        <div className="flex flex-col items-center bg-gray-900 w-full relative p-4 min-h-[70vh]">
          <h1 className="font-semibold text-2xl text-white mb-4 text-center">
            {selectedRoadmap?.title || 'Select a Roadmap'}
          </h1>

          {selectedRoadmap && (
            <div className="roadmap-scrollbar w-full h-[80vh] rounded-lg border border-slate-700 overflow-auto overscroll-contain touch-pan-x touch-pan-y bg-gray-800">
              <div
                style={{
                  width: `${graphData.contentWidth}px`,
                  height: `${graphData.contentHeight}px`,
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <ReactFlow
                  nodes={graphData.nodes}
                  edges={graphData.edges}
                  fitView={false}
                  panOnDrag={false}
                  panOnScroll={false}
                  zoomOnScroll={false}
                  zoomOnPinch={true}
                  zoomOnDoubleClick={true}
                  preventScrolling={false}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar with roadmap titles */}
        <div className="w-full bg-gray-900 text-white p-4">
          <h3 className="text-lg font-semibold mb-3">Explore Other Roadmaps</h3>
          <div className="flex flex-wrap gap-3">
            {roadmaps.map((roadmap, index) => (
              <button
                key={index}
                className="px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-900 text-white rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setSelectedRoadmap(roadmap)}
              >
                {roadmap.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapViewer;