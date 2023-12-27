import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';

import saveAs from 'file-saver';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const saveAsJson = (toSave, fileName) => {
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });
  saveAs(blob, fileName);
};


const showInNewTab = (toSave, fileName) => {
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });

  const objectUrl = URL.createObjectURL(blob);
  const newTab = window.open(objectUrl, '_blank');
  URL.revokeObjectURL(objectUrl);
};


const handleSave = (nodes, edges) => {
  const graphNodes = {
    nodes: nodes,
  };
  // saveAsJson(graphNodes, "graphNodes.json")
  showInNewTab(graphNodes)

  const graphEdges = {
    edges: edges,
  };
  // saveAsJson(graphEdges, "graphEdges.json")
  showInNewTab(graphEdges)
  
};

function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <>
      <div style={{
        height: "50vh",
        width: "50vw",
        border: "1px solid black",
        marginLeft: "12.5vw",
      }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <button type="button" class="btn btn-primary" onClick={() => handleSave(nodes, edges)}>Save</button>
    </>
  );
}

export default FlowChart;