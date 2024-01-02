import { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import { nodeTypes } from "./Nodes";

import saveAs from 'file-saver';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './SideBar';

const initialEdges = [
  { id: '0-1', source: '0', target: '1' },
  { id: '1-2', source: '1', target: '2' }
];
const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
  },
  {
    id: '1',
    type: 'default',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'ttt' },
    position: { x: 200, y: 200 },
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


function Flow() {
  const reactFlowInstance = useReactFlow();

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
          const { nodes, edges } = JSON.parse(e.target.result);
          reactFlowInstance.setNodes(nodes);
          reactFlowInstance.setEdges(edges);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const addNewNode = useCallback((nodeType) => {
    const id = reactFlowInstance.getNodes().length;
    const newNode = {
      id,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      data: {
        label: `${nodeType}`,
      },
      type: `${nodeType}`,
      width: 150,
      height: 40
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const handleSave = () => {
    const graphNodes = {
      nodes: reactFlowInstance.getNodes(),
      edges: reactFlowInstance.getEdges()
    };
    saveAsJson(graphNodes, "graph.json")
    showInNewTab(graphNodes)
  };

  const edgeOptions = {
    animated: true,
    style: {
      stroke: 'green',
    },
  };

  return (
    <div className='flex-container'>
      <SideBar nodeTypes={nodeTypes} onSubmit={addNewNode} />
      <div className="main-column">
        <h1 className="center"> Document Extractor </h1>
        <div className='flowchart-container'>
          <ReactFlow
            defaultNodes={initialNodes}
            defaultEdges={initialEdges}
            defaultEdgeOptions={edgeOptions}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <button type="button" className="btn btn-primary adjust-left" onClick={handleSave}>Save</button>
        <button type="button" className="btn btn-secondary adjust-right" onClick={handleLoad}>Load</button>
      </div>
    </div>
  );
}



function FlowChart() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default FlowChart;