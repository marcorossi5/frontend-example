import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import { nodeTypes } from "./Nodes";

import saveAs from 'file-saver';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' }
];
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
    type: 'output',
  },
  {
    id: '3',
    data: { label: '' },
    position: { x: 200, y: 200 },
    type: 'ReadPdf',
  },
];

const saveAsJson = (toSave, fileName) => {
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });
  saveAs(blob, fileName);
};


const showInNewTab = (toSave, fileName) => {
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });

  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, '_blank');
  URL.revokeObjectURL(objectUrl);
};


const handleSave = (nodes, edges) => {
  const graphNodes = {
    nodes: nodes,
    edges: edges
  };
  saveAsJson(graphNodes, "graph.json")
  showInNewTab(graphNodes)
};

function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleLoad = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', (event) => handleFileChange(event));
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedGraph = JSON.parse(e.target.result);
          setNodes(loadedGraph.nodes);
          setEdges(loadedGraph.edges);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

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
    <div className='flex-container'>
      <div className='sidebar'>
        <h1> The Sidebar </h1>
      </div>
      <div className="main-column">
        <h1 className="center"> Document Extractor </h1>
        <div className='flowchart-container'>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <button type="button" className="btn btn-primary adjust-left" onClick={() => handleSave(nodes, edges)}>Save</button>
        <button type="button" className="btn btn-secondary adjust-right" onClick={handleLoad}>Load</button>
      </div>
    </div>
  );
}

export default FlowChart;